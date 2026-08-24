// Style reminder: 胶囊星球像素剧场；首页不展示模板内容，直接进入可玩的横版格斗舞台。
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

export default function App(){return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Home /></TooltipProvider></ThemeProvider></ErrorBoundary>}
