import { AlertMessage } from "@/components/alert_message";

export function signOut() {
  localStorage.removeItem("@chip_control:user");
  localStorage.removeItem("@chip_control:token");

  AlertMessage("Saindo...", "success");

  setTimeout(() => {
    window.location.reload();
  }, 3000);
}
