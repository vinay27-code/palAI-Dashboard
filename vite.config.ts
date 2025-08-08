import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  define: {
    __BASE_PATH__: JSON.stringify('/'),
    __IS_PREVIEW__: JSON.stringify(false),
  },
  plugins: [
    react(),
    AutoImport({
      imports: {
        react: [
          'React', 'useState', 'useEffect', 'useContext', 'useReducer',
          'useCallback', 'useMemo', 'useRef', 'useImperativeHandle',
          'useLayoutEffect', 'useDebugValue', 'useDeferredValue', 'useId',
          'useInsertionEffect', 'useSyncExternalStore', 'useTransition',
          'startTransition', 'lazy', 'memo', 'forwardRef', 'createContext',
          'createElement', 'cloneElement', 'isValidElement'
        ],
        'react-router-dom': [
          'useNavigate', 'useLocation', 'useParams', 'useSearchParams',
          'Link', 'NavLink', 'Navigate', 'Outlet'
        ],
        'react-i18next': ['useTranslation', 'Trans'],
      },
      dts: true,
    }),
  ],
  base: '/',
  build: {
    sourcemap: false,
    outDir: 'dist', // ✅ Needed by Netlify
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
})
