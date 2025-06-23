
import Componentwrapper from "./componentwrapper";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
    <div className="App">
            <Componentwrapper />
    </div>
    </SnackbarProvider>
  );
}

export default App;
