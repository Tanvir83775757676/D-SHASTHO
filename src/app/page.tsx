// Root page — redirect to landing
import { redirect } from 'next/navigation'
export default function Root() {
  redirect('/landing')
}
