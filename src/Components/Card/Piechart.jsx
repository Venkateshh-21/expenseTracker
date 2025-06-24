
import styles from "./Piechart.module.css"
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const COLORS=["#A000FF","#FF9304","#FDE006"]
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const Piechart = ({data}) => {
  
    
  return (
    <div className={styles.piechartwrap}>  
        <div className={styles.piechart}>
         <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
        <div className ={styles.labellings}>
           <p className={styles.foodlabel}>
            <span className={styles.food}></span>
            Food
           </p>
            <p className={styles.entertainmentlabel}>
            <span className={styles.entertainment}></span>
            Entertainment
           </p>
            <p className={styles.travellabel}>
            <span className={styles.travel}></span>
            Food
           </p>

        </div>
    </div>
  )
}

export default Piechart