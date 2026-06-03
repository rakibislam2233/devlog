import { redirect } from 'next/navigation';
import React from 'react'

const HomePage = () => {
 redirect('/auth/login');
}

export default HomePage
