import React from 'react'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Layout from './components/Layout';
import Department from './pages/Department';
import Line from './pages/Line';
import Section from './pages/Section';
import TidNo from './pages/TidNo';
import Styles from './pages/Styles';
import Colors from './pages/Colors';
import GarmentsCode from './pages/GarmentsCode';
import Sizes from './pages/Sizes';
export const App = () => {
    return (
        <>

            <Router>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/department" element={<Department />} />
                        <Route path="/line" element={<Line />} />
                        <Route path="/section" element={<Section />} />
                        <Route path="/tidno" element={<TidNo />} />
                        <Route path="/style" element={<Styles />} />
                        <Route path="/color" element={<Colors />} />
                        <Route path="/garment-code" element={<GarmentsCode />} />
                        <Route path="/size" element={<Sizes />} />
                        {/* Add more routes as needed */}
                    </Route>
                    <Route path="/" element={<Login />} />
                </Routes>
            </Router>


        </>
    )
}
