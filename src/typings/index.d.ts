import { Root } from "react-dom/client";


declare global {
    interface Window {
        reactRoot: Root;
    }

    interface NodeModule {
        hot: {
            accept: ()=>void;
        }
    }
    
    module '*.module.css';
}

export {}
