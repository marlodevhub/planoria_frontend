import { ProductivityCard } from './ProductivityCard'

const days = [
    { day: 'Lun', date: 18, productive: 86, productiveTime: '5h 12m', timeAtWork: '5h 45m' },
    { day: 'Mar', date: 19, productive: 72, productiveTime: '4h 10m', timeAtWork: '6h 30m', active: true },
    { day: 'Mié', date: 20, productive: 60, productiveTime: '3h 05m', timeAtWork: '7h 10m' },
]

export function ProductivityList() {
    return (
        <div className="space-y-3">
            {days.map((d) => (
                <ProductivityCard key={d.date} {...d} />
            ))}
        </div>
    )
}