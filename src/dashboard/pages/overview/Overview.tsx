// import React from 'react'

import { DashboardStats } from "./_components/DashboardStats"
import { RecentUserOverview } from "./_components/RecentUserOverview"

const AdminOverview = () => {
  return (
    <div>
      <DashboardStats />
      <RecentUserOverview />
    </div>
  )
}

export default AdminOverview;
