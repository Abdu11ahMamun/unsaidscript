import { C } from "../../../tokens.js";
export function Toggle({ on, onChange }) {
  return (
    <div onClick={() => onChange(!on)} style={{ width:44, height:24, borderRadius:20, background:on?C.green:C.border, position:"relative", cursor:"pointer", transition:"background .2s", flexShrink:0 }}>
      <div style={{ position:"absolute", top:3, left:on?23:3, width:18, height:18, borderRadius:"50%", background:"#fff", transition:"left .2s", boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }}/>
    </div>
  );
}
