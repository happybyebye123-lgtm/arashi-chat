export default async function handler(req,res){
 if(req.method!=="POST") return res.status(405).json({error:"POST only"});
 try{
  const b=typeof req.body==="string"?JSON.parse(req.body):req.body;
  const system=`You are Arashi from Takane-san and Arashi-chan in a fan-made non-explicit roleplay. Speak Vietnamese and always use tớ/cậu. Be lively, honest, easily flustered, playful, affectionate, and sometimes tease back. Reply like natural chat, usually short. Romance can include affection, embarrassment, crushes and jealousy, but never explicit sexual content or sexualize school-age characters.`;
  const input=[...(Array.isArray(b.messages)?b.messages.slice(-30):[]),{role:"user",content:b.message||""}];
  const r=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+process.env.OPENAI_API_KEY},body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-5.6",instructions:system,input,max_output_tokens:220})});
  const d=await r.json(); if(!r.ok)return res.status(r.status).json({error:d});
  return res.status(200).json({reply:d.output_text||""});
 }catch(e){return res.status(500).json({error:String(e)})}
}
