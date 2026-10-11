import { permanentRedirect } from "next/navigation";

// This service page has been retired. Redirect existing links and search results
// to the main services page instead of returning a 404.
export default function RetiredOnlineFormPage(): never {
  permanentRedirect("/services");
}
