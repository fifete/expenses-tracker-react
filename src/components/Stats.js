import React from 'react'
import { PieChart, Pie, Cell } from "recharts";
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

export const Stats = () => {
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
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={70}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  )
}
