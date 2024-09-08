'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import WeeklySalesChart from '@/components/charts/WeeklySalesChart'
import MonthlySalesRevenueChart from '@/components/charts/MonthlySalesRevenueChart'
import CashRevenueChart from '@/components/charts/CashRevenueChart'
import InvestableCashChart from '@/components/charts/InvestableCashChart'
import InventoryChart from '@/components/charts/InventoryChart'
import CombinedChart from '@/components/charts/CombinedChart'

export function LandingPage() {
  const [inputs, setInputs] = useState({
    initialInventory: 1000,
    initialBottlesSold: 500,
    costPerBottle: 5,
    sellPricePerBottle: 29,
    amazonFeeRate: 0.30,
    advertisementFeeRate: 0.30,
    weeksToReinvest: 3,
    totalWeeks: 40,
    salesIncreaseRate: 0.06,
    operationalReserve: 0.10,
    restockRatio: 4.6,
    capitalAllocationWeeks: 15
  })

  const [simulationResults, setSimulationResults] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) }))
  }

  const runSimulation = () => {
    const results = refinedGrowthSimulation(inputs)
    setSimulationResults(results)
  }

  const refinedGrowthSimulation = (params) => {
    const {
      initialInventory,
      initialBottlesSold,
      costPerBottle,
      sellPricePerBottle,
      amazonFeeRate,
      advertisementFeeRate,
      weeksToReinvest,
      totalWeeks,
      salesIncreaseRate,
      operationalReserve,
      restockRatio,
      capitalAllocationWeeks
    } = params

    const week = 0
    const bottlesSold = initialBottlesSold
    const cashOnHand = 0
    const inventory = initialInventory
    const history = [[week, bottlesSold]]
    const inventoryHistory = [inventory]
    const monthlySales = []
    const monthlyAccumulator = 0
    const monthlyRevenues = []
    const cashOnHandHistory = []
    const netMonthlyRevenues = []
    const investableCashHistory = [0]

    while (week < totalWeeks) {
      let investableCash = 0
      const projectedBottlesSold = Math.floor(bottlesSold * (1 + salesIncreaseRate))
      bottlesSold = Math.min(projectedBottlesSold, inventory)

      const weeklyRevenue = bottlesSold * sellPricePerBottle
      const amazonFee = weeklyRevenue * amazonFeeRate
      const advertisementFee = weeklyRevenue * advertisementFeeRate
      const netWeeklyRevenue = weeklyRevenue - amazonFee - advertisementFee

      cashOnHand += netWeeklyRevenue
      monthlyAccumulator += bottlesSold
      inventory -= bottlesSold

      if (week % weeksToReinvest === 2 || week < capitalAllocationWeeks) {
        if (week < capitalAllocationWeeks) {
          investableCash = cashOnHand * (1 - operationalReserve)
        } else {
          const requiredCashForProduction = projectedBottlesSold * costPerBottle * restockRatio
          investableCash = Math.min(requiredCashForProduction, cashOnHand * (1 - operationalReserve))
        }

        cashOnHand -= investableCash
        const bottlesToProduce = Math.floor(investableCash / costPerBottle)
        inventory += bottlesToProduce
      }

      investableCashHistory.push(investableCash)
      inventoryHistory.push(inventory)

      if ((week + 1) % 4 === 0) {
        const monthlyRevenue = monthlyAccumulator * sellPricePerBottle
        const monthlyAmazonFee = monthlyRevenue * amazonFeeRate
        const monthlyAdvertisementFee = monthlyRevenue * advertisementFeeRate
        const monthlyCogs = monthlyAccumulator * costPerBottle
        const monthlyNetRevenue = monthlyRevenue - (monthlyAmazonFee + monthlyAdvertisementFee + monthlyCogs)

        monthlySales.push(monthlyAccumulator)
        monthlyRevenues.push(monthlyRevenue)
        netMonthlyRevenues.push(monthlyNetRevenue)
        cashOnHandHistory.push(cashOnHand)
        monthlyAccumulator = 0
      }

      week++
      history.push([week, bottlesSold])
    }

    return { history, monthlySales, monthlyRevenues, cashOnHandHistory, netMonthlyRevenues, investableCashHistory, inventoryHistory }
  }

  const prepareChartData = (results) => {
    if (!results) return null

    return {
      weeklySales: results.history.map((item, index) => ({
        week: index,
        bottlesSold: item[1]
      })),
      monthlySalesRevenue: {
        months: Array.from({ length: results.monthlySales.length }, (_, i) => i + 1),
        monthlySales: results.monthlySales,
        monthlyRevenues: results.monthlyRevenues
      },
      cashRevenue: {
        months: Array.from({ length: results.netMonthlyRevenues.length }, (_, i) => i + 1),
        cashOnHand: results.cashOnHandHistory,
        netRevenue: results.netMonthlyRevenues
      },
      investableCash: {
        weeks: Array.from({ length: results.investableCashHistory.length }, (_, i) => i),
        investableCash: results.investableCashHistory
      },
      inventory: {
        weeks: Array.from({ length: results.inventoryHistory.length }, (_, i) => i),
        inventoryLevels: results.inventoryHistory
      }
    }
  }

  const chartData = simulationResults ? prepareChartData(simulationResults) : null

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="bg-cover bg-center h-screen flex flex-col justify-center items-center text-white p-8 text-center" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920')"}}>
        <h1 className="text-5xl font-bold mb-4 shadow-text">Your Knowledge + Our Experience = Health of Millions</h1>
        <h2 className="text-3xl mb-8 shadow-text">Become our partner today</h2>
        <Button size="lg" className="text-xl px-8 py-4">Use the Calculator</Button>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Why partner with us?</h2>
          <p className="mb-4">As a doctor, you save lives and improve health every day. We offer you the opportunity to leverage our expertise in creating and launching successful dietary supplement brands, so that together we can achieve even greater success.</p>
          <p>Ready to start a new chapter in your professional life? Use our calculator below to see how your contribution can lead not only to your financial success but also to the health of millions.</p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Investment Calculator</h2>
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Investment Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="initialInventory">Initial Inventory</Label>
                    <Input 
                      id="initialInventory" 
                      name="initialInventory"
                      type="number" 
                      value={inputs.initialInventory}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="initialBottlesSold">Initial Bottles Sold</Label>
                    <Input 
                      id="initialBottlesSold" 
                      name="initialBottlesSold"
                      type="number" 
                      value={inputs.initialBottlesSold}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="costPerBottle">Cost Per Bottle ($)</Label>
                    <Input 
                      id="costPerBottle" 
                      name="costPerBottle"
                      type="number" 
                      value={inputs.costPerBottle}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sellPricePerBottle">Sell Price Per Bottle ($)</Label>
                    <Input 
                      id="sellPricePerBottle" 
                      name="sellPricePerBottle"
                      type="number" 
                      value={inputs.sellPricePerBottle}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amazonFeeRate">Amazon Fee Rate (%)</Label>
                    <Input 
                      id="amazonFeeRate" 
                      name="amazonFeeRate"
                      type="number" 
                      value={inputs.amazonFeeRate * 100}
                      onChange={(e) => handleInputChange({...e, target: {...e.target, value: parseFloat(e.target.value) / 100}})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="advertisementFeeRate">Advertisement Fee Rate (%)</Label>
                    <Input 
                      id="advertisementFeeRate" 
                      name="advertisementFeeRate"
                      type="number" 
                      value={inputs.advertisementFeeRate * 100}
                      onChange={(e) => handleInputChange({...e, target: {...e.target, value: parseFloat(e.target.value) / 100}})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weeksToReinvest">Weeks to Reinvest</Label>
                    <Input 
                      id="weeksToReinvest" 
                      name="weeksToReinvest"
                      type="number" 
                      value={inputs.weeksToReinvest}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalWeeks">Total Weeks</Label>
                    <Input 
                      id="totalWeeks" 
                      name="totalWeeks"
                      type="number" 
                      value={inputs.totalWeeks}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salesIncreaseRate">Sales Increase Rate (%)</Label>
                    <Input 
                      id="salesIncreaseRate" 
                      name="salesIncreaseRate"
                      type="number" 
                      value={inputs.salesIncreaseRate * 100}
                      onChange={(e) => handleInputChange({...e, target: {...e.target, value: parseFloat(e.target.value) / 100}})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="operationalReserve">Operational Reserve (%)</Label>
                    <Input 
                      id="operationalReserve" 
                      name="operationalReserve"
                      type="number" 
                      value={inputs.operationalReserve * 100}
                      onChange={(e) => handleInputChange({...e, target: {...e.target, value: parseFloat(e.target.value) / 100}})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="restockRatio">Restock Ratio</Label>
                    <Input 
                      id="restockRatio" 
                      name="restockRatio"
                      type="number" 
                      value={inputs.restockRatio}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="capitalAllocationWeeks">Capital Allocation Weeks</Label>
                    <Input 
                      id="capitalAllocationWeeks" 
                      name="capitalAllocationWeeks"
                      type="number" 
                      value={inputs.capitalAllocationWeeks}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <Button onClick={runSimulation} className="w-full">Calculate</Button>
              </div>

              {chartData && (
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <WeeklySalesChart data={chartData.weeklySales} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Sales and Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MonthlySalesRevenueChart data={chartData.monthlySalesRevenue} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Cash and Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CashRevenueChart data={chartData.cashRevenue} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Investable Cash</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <InvestableCashChart data={chartData.investableCash} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Inventory Levels</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <InventoryChart data={chartData.inventory} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Combined Chart: Investable Cash and Inventory</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CombinedChart 
                        investableCashData={chartData.investableCash} 
                        inventoryData={chartData.inventory} 
                      />
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Products and Services:</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Exclusive Products', 'Best Price', 'Sales through Amazon'].map((title, index) => (
              <Card key={index} className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p>Description for {title.toLowerCase()} goes here.</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">About Us:</h2>
          <p className="mb-4">We are a team of specialists with extensive experience in the healthcare and marketing industries, specializing in creating and successfully launching dietary supplement (DS) brands.</p>
          <p className="mb-4">Our experience in launching several successful brands is backed by tens of millions of dollars in revenue and the trust of millions of customers.</p>
          <p>We are proud of our values, which are based on the desire to help people and our commitment to constantly finding new ways to improve their lives and health.</p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Brand Logos</h2>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 h-24 rounded-lg flex items-center justify-center">
                Logo {i}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">How We Do It:</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Proven Approach', 'Steady Growth', 'Continuous Improvement'].map((title, index) => (
              <Card key={index} className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p>Description for {title.toLowerCase()} goes here.</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Quality and Safety</h2>
          <p className="mb-4">We strive for the highest quality and safety of all our products. Our company closely monitors every stage of production, from selecting high-quality ingredients to quality control at every step of production.</p>
          <p className="mb-4">We guarantee that our products meet all necessary quality and safety standards, as confirmed by relevant certificates and licenses.</p>
          <p>Our customers can rest assured that by purchasing our products, they are receiving not only effective dietary supplements but also products that have undergone rigorous quality and safety control.</p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Reviews</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <p className="italic mb-4">"Great product! Highly recommended."</p>
                <p className="font-semibold">- Customer {i}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Benefits of Partnership:</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Proven Effectiveness', 'Financial Growth', 'Professional Development'].map((title, index) => (
              <Card key={index} className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p>Description for {title.toLowerCase()} goes here.</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Card className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Us</h2>
            <p className="mb-6">Join our community of partners who are betting on health and prosperity. Your contribution will help improve the health of millions and achieve financial success.</p>
            <Button size="lg">Contact Us</Button>
          </Card>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>© 2024 Your Knowledge + Our Experience = Health of Millions</p>
      </footer>
    </div>
  )
}