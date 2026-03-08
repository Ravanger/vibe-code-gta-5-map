import { Sidebar } from './components/Sidebar/Sidebar';
import { GTA5Map } from './components/Map/GTA5Map';

function App() {
  return (
    <div id="app-container" className="flex h-screen w-screen overflow-hidden bg-[#0c0c18] font-inter antialiased">
      <Sidebar />
      <main className="flex-1 relative overflow-hidden">
        <GTA5Map />
      </main>
    </div>
  );
}

export default App;
