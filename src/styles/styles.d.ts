import 'styled-components';
import { Theme } from "interfaces/Theme";

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
