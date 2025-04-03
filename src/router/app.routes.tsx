import { Routes, Route } from "react-router-dom";

import { Header } from "@/components/header";
import { User } from "@/pages/app/users";
import { Chips } from "@/pages/app/chips";
import { Holders } from "@/pages/app/holders";
import { Devices } from "@/pages/app/devices";
import { SmsReceiver } from "@/pages/app/sms-receiver";
import { NotFound } from "@/pages/404";
import { Recharges } from "@/pages/app/recharges";
import { Controls } from "@/pages/app/controls";

export function AppRoutes() {
  return (
    <>
      <Header />
      <main className="full mx-auto py-10 px-3">
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/users" element={<User />} />
          <Route path="/chips" element={<Chips />} />
          <Route path="/holders" element={<Holders />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/recharges" element={<Recharges />} />
          <Route path="/controls" element={<Controls />} />
          <Route path="/sms-receiver" element={<SmsReceiver />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
