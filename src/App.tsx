import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/auth-context"
import { Navbar } from "./components/Navbar"
import Home from "./pages/Home"
import { Login } from "./pages/Login"
import { AdminPanel } from "./pages/AdminPanel"
import { AdminRoute } from "./components/routes/Admin-route"
import { DaemonRoute } from "./components/routes/Daemon-route"
import { DaemonManagement } from "./pages/DaemonManagement"
import { DaemonReward } from "./pages/DaemonReward"
import { DaemonReports } from "./pages/DaemonReports"
import { DaemonPanel } from "./pages/DaemonPanel"
import { DaemonVictims } from "./pages/DaemonVictims"
import { AddVictims } from "./pages/AddVictims"
import { VictimsManagement } from "./pages/VictimsManagement"
import { SubmitReport } from "./pages/SubmitReport"
import { Resistance } from "./pages/Resistance"
import { Footer } from "./components/Footer"
import { ManageContent } from "./pages/ManageContent"

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar
            brand="Manur's empire"
            items={[
              { label: "Home", href: "/" },
              { label: "Admin", href: "/adminpanel", requiresAdmin: true },
              { label: "Daemon", href: "/daemonpanel", requiresAuth: true },
              { label: "Resistance", href: "/resistance"}
            ]}
          />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resistance" element={<Resistance></Resistance>}></Route>
              <Route path="/login" element={<Login></Login>} />
              <Route path="/adminpanel" element={<AdminRoute><AdminPanel></AdminPanel></AdminRoute>}>
                <Route path="daemons" element={<DaemonManagement></DaemonManagement>} />
                <Route path="daerewards" element={<DaemonReward></DaemonReward>} />
                <Route path="daereports" element={<DaemonReports></DaemonReports>} />
                <Route path="victims" element={<VictimsManagement></VictimsManagement>} />
                <Route path="content" element={<ManageContent></ManageContent>} />
              </Route>
              <Route path="/daemonpanel" element={<DaemonRoute><DaemonPanel></DaemonPanel></DaemonRoute>}>
                <Route path="addvictim" element={<AddVictims></AddVictims>}></Route>
                <Route path="submitreport" element={<SubmitReport></SubmitReport>}></Route>
                <Route path="myvictims" element={<DaemonVictims></DaemonVictims>}></Route>
              </Route>
            </Routes>
          </main>
          <Footer></Footer>
        </div>
      </Router>
    </AuthProvider>
  )
}
