import React from 'react'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Layout from './components/Layout';
import Department from './pages/Organization/Department';
import Line from './pages/Organization/Line';
import Section from './pages/Organization/Section';
import TidNo from './pages/Design/TidNo';
import Styles from './pages/Design/Styles';
import Colors from './pages/Design/Colors';
import GarmentsCode from './pages/Design/GarmentsCode';
import Sizes from './pages/Design/Sizes';
import Operations from './pages/Production/Operations';
import OperationMapping from './pages/Production/OperationMapping';
import Machines from './pages/Maintenance/Machines';
import MachineIssue from './pages/Maintenance/MachineIssue';
import Workers from './pages/Workers';
import Supervisor from './pages/Supervisor';
import Bundles from './pages/Bundles';
import Tasks from './pages/Tasks';
import Reports from './pages/Reports';
import OperationCreate from './components/Operation/OperationCreate';
import OperationEdit from './pages/Production/OperationEdit';
import  WorkersFormCreate  from './components/Worker/WorkersFormCreate';
import WorkerEdit from './components/Worker/WorkerEdit';
import SupervisorCreate from './components/Supervisor/SupervisorCreate';
import SupervisorEdit from './components/Supervisor/SupervisorEdit';
import BundlesCreate from './components/Bundle/BundleCreate';
import BundleReport from './pages/BundleReport';
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
                        <Route path='/operation' element={<Operations />} />
                        <Route path='/operation-mapping' element={<OperationMapping />} />
                        <Route path='/operation-mapping/create' element={<OperationCreate />} />
                        <Route path='/operation-mapping/edit/:id' element={<OperationEdit/> } />
                        <Route path='/machines' element={<Machines />} />
                        <Route path='/machine-issues' element={<MachineIssue/>} />
                        <Route path='/worker' element={<Workers/>} />
                        <Route path='/worker/create' element={<WorkersFormCreate/>} />
                        <Route path='/worker/edit/:id' element={<WorkerEdit/>} />
                        <Route path='/supervisor' element={<Supervisor/>} />
                        <Route path='/supervisor/create' element={<SupervisorCreate/>} />
                        <Route path='/supervisor/edit/:id' element={<SupervisorEdit/>} />
                        <Route path='/bundel' element={<Bundles/>} />
                        <Route path='/bundel/create' element={<BundlesCreate/>} />
                        <Route path='/bundel-report/:id' element={<BundleReport/>} />
                        <Route path='/task' element={<Tasks/>} />
                        <Route path='/report' element={<Reports/>} />
                        {/* Add more routes as needed */}
                    </Route>
                    <Route path="/" element={<Login />} />
                </Routes>
            </Router>


        </>
    )
}
