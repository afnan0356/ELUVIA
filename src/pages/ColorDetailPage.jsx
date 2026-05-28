import { useParams } from 'react-router-dom'

export default function ColorDetailPage() {
  const { name } = useParams()
  return <div>ColorDetailPage: {name}</div>
}
