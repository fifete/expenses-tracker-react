import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useCategories } from '../contexts/CategoriesContext';
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

export const Stats = () => {
  const {getCategoriesAmount} = useCategories()
  const [categoriesAmount, setcategoriesAmount] = useState([])
  const date = new Date().toLocaleString().split(',')[0]

  useEffect(() => {
    async function fetchAmount() {
      const categoriesAmountResponse = await getCategoriesAmount(date);
      setcategoriesAmount(categoriesAmountResponse)
    }
    fetchAmount();
  }, []);
  return (
    <div>
      <i>🔙</i>
      <div>
        <h1>My expenses</h1>
        <div>
          <span>Today</span>
          <i>🔻</i>
        </div>
      </div>
      <div>
        <h2>Chart</h2>
        <PieChart width={800} height={400}>
          <Pie
            data={categoriesAmount}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={70}
            paddingAngle={2}
            dataKey="spending_amount"
          >
            {categoriesAmount.map(category => {
              return <Cell key={category.id} fill={category.color} />
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      <div>
        {
          categoriesAmount.map(category => (
            <div>
              <i>⭕</i>
              <p>{category.name}</p>
              <span>{category.spending_amount}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}
