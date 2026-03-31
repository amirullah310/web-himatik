import{r as t,j as r}from"./app-BGX86Ga_.js";import{m as i}from"./proxy-DgjyhWp5.js";import{c as n}from"./createLucideIcon-sv-SHJq7.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],c=n("ArrowUp",a),w=()=>{const[s,o]=t.useState(!1);t.useEffect(()=>{const e=()=>{window.scrollY>300?o(!0):o(!1)};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]);const l=()=>{window.scrollTo({top:0,behavior:"smooth"})};return r.jsx(i.button,{onClick:l,className:`fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-purple-500 text-white shadow-lg transition-all duration-300 hover:bg-purple-600 ${s?"opacity-100 translate-y-0":"opacity-0 translate-y-10 pointer-events-none"}`,whileTap:{scale:.9},"aria-label":"Scroll to top",children:r.jsx(c,{className:"w-6 h-6"})})};export{w as A};
