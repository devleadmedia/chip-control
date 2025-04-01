import { useContextState } from "@/hook/state";
import { IsFocusProps } from "@/interface/state.d";
import { User } from "./user";
import { Chips } from "./chip";
import { Holders } from "./holders";
import { Device } from "./device";
import { Recharge } from "./Recharge";
import { Control } from "./control";
import { SmsReceiver } from "./sms_receiver";

export function Home() {
  const { isFocus } = useContextState() as IsFocusProps;
  return (
    <>
      <main className="full max-w-7xl mx-auto py-10 px-3">
        {isFocus === "usuario" && <User />}
        {isFocus === "chips" && <Chips />}
        {isFocus === "holders" && <Holders />}
        {isFocus === "device" && <Device />}
        {isFocus === "recharge" && <Recharge />}
        {isFocus === "control" && <Control />}
        {isFocus === "sms_receiver" && <SmsReceiver />}
      </main>
    </>
  );
}
