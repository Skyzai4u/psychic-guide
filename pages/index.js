import Head from 'next/head';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Torus, Stars, Float } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { AVATAR_SPRITE } from '../lib/avatar';

const views=[0,45,90,180,270,315];

const projects=[
 {n:'01',title:'ShahOptics Web & Application',meta:'Client: Shah Latif Optics',tags:['React','Supabase','WhatsApp'],desc:'Custom eCommerce and inventory system with WhatsApp integration for optical retail.'},
 {n:'02',title:'Ziyqa Falooda POS System',meta:'Lightweight POS System',tags:['.NET','SQL Server'],desc:'Real-time billing and stock-control solution designed for practical daily operations.'},
 {n:'03',title:'LoopKart ERP Platform',meta:'Role-based ERP',tags:['Figma','Firebase','Supabase','SQL Server'],desc:'Role-based ERP platform for distributors, shopkeepers and customers.'},
 {n:'04',title:'AMS Biometric Attendance',meta:'HR / Attendance System',tags:['ZKTeco','Supabase','Blazor'],desc:'Biometric attendance workflow integrating ZKTeco devices with Supabase backend and Blazor WebAssembly frontend.'},
 {n:'05',title:'Smart Agreement Generator',meta:'Bilingual Document Automation',tags:['Node.js','PDF','Word','AI'],desc:'Urdu/English document builder with automated formatting and PDF/Word export.'},
 {n:'06',title:'Damage Note Sheet OCR',meta:'Bachaa Party Operations',tags:['OCR','AX','Automation'],desc:'Snapshots are processed through OCR and verified in AX, reducing a manual monthly process from 3+ days to a few hours.'}
];

const experience=[
 {date:'Oct 2025 — Present',role:'Information Technology Executive',company:'Bachaa Party Pakistan',details:'IT Operations / Retail Technology',bullets:['Technical support and technology management','POS, networking, printers, CCTV and workstation support','Billing, synchronization, connectivity and server-side troubleshooting','Preventive maintenance and day-to-day technical operations','Internal coordination and vendor/service escalations','OCR-based Damage Note Sheet automation with AX verification']},
 {date:'Jun 2022 — Aug 2025',role:'Help Desk Support Engineer',company:'Logical Technologist',details:'Hyderabad • UAE & Saudi clientele',bullets:['L1/L2 support for Windows OS, networking and server configurations','Windows Server 2003/2008, LAN, DHCP, DNS and VPN','ERP support for e-Mestro Retail & Distribution','SQL debugging, API request analysis and ERP data verification','Engineering escalations, hotfix deployment and issue triage','95% of tickets resolved within SLA']},
 {date:'2021 — Present',role:'Freelance Vibe Coder / IT Specialist',company:'FactsSolution / Vibe Coder',details:'Digital products • Automation • AI',bullets:['Build digital solutions, workflows and custom automations','AI-powered n8n workflows, Telegram bots and API automation','Google Auth / SMTP and AI image tools','Bilingual Urdu/English smart agreement generator','Automated attendance workflows with Firebase / Supabase','IT consulting, ERP support and small-business system optimization']},
 {date:'Feb 2018 — Present',role:'Founder • Full-Stack Developer • AI Integrator • Product Architect',company:'Factssolution',details:'Hyderabad • Freelance / Client Projects',bullets:['Own complete product lifecycle from idea to deployment','UI/UX, architecture, backend systems and cloud integration','Build full-stack and AI-powered applications for SMEs and startups','Lead development, client delivery, support and deployment']},
 {date:'Jun 2018 — Aug 2022',role:'Business Owner',company:'Airox.pk',details:'Wholesale distribution • Hyderabad',bullets:['Consumer electronics, mobile accessories, gadgets and lifestyle technology','Annual turnover over PKR 12 million','50+ regular retail stores','Supply chain, vendors, international suppliers and wholesale orders','Logistics, pricing, stock planning, revenue growth and team leadership','Sales, marketing and customer service; maintained positive cash flow']},
 {date:'May 2015 — Aug 2018',role:'Camera Monitoring Trainer',company:'Oxiliry',details:'Hyderabad • Full-time',bullets:['Training new employees and creating SOPs','Surveillance software, reporting tools and live monitoring','Monitoring protocols, incident response and quality checks','Structured training modules and mentorship','Improved monitoring accuracy and reduced false reporting through coaching']},
 {date:'2016 — 2018',role:'Product Manager',company:'Collaborative',details:'Startup / Surveillance',bullets:['Startup processes','Surveillance design','Team management']},
 {date:'2014 — 2016',role:'Help Desk Engineer',company:'Logical Technologist',details:'UAE hospitals • Saudi hospitals • Local clients',bullets:['IT support across international and local client environments']},
 {date:'Oct 2011 — Oct 2015',role:'Camera Monitoring Team Lead',company:'Basecamp IT Solutions Private Limited',details:'Pakistan • Full-time',bullets:['Supervised Camera Monitoring Team and daily operations','Monitoring reports and reporting to concerned departments','Time management and customer count reports','KPI tracking and performance analysis','Compiled findings from Managers, Regional Managers, District Managers and Store Managers','Forwarded findings to CEO / COO to support strategic decision-making']},
 {date:'Dec 2007 — Dec 2011',role:'Camera Monitoring Auditor',company:'Oxiliry Pakistan',details:'On-site • Full-time',bullets:['Live and archive camera monitoring','Data collection and company guidelines','In-house software and report generation','Client reporting for USA clients','Camera Monitoring Operator / Business Process Outsourcing']},
 {date:'2007 — 2011',role:'Instructor',company:'Oxiliry',details:'Training & Operations',bullets:['Training new staff','SOP creation','Real-time monitoring','Reporting']}
];

const skills={
 'Frontend & Product':['React.js','Angular','TailwindCSS','Figma','UI/UX'],
 'Backend & Data':['Node.js','.NET 6/7','PostgreSQL','SQL Server','Blazor','Firebase','Supabase'],
 'AI & Automation':['n8n','AI Workflows','API automation','Telegram Bots','AI Tools'],
 'IT & Infrastructure':['Technical Support','Technology Management','Networking','Windows Server 2003/2008','LAN','DHCP','DNS','VPN','ITIL','ERP Support','Cloud Integration']
};

function Avatar3D({view,setView}){
 const group=useRef(), [textures,setTextures]=useState([]);
 const drag=useRef({active:false,x:0});
 useEffect(()=>{
   const loader=new THREE.TextureLoader();
   loader.load(AVATAR_SPRITE,(base)=>{
     base.colorSpace=THREE.SRGBColorSpace;
     const arr=views.map((_,i)=>{
       const t=base.clone();
       t.colorSpace=THREE.SRGBColorSpace;
       t.wrapS=THREE.ClampToEdgeWrapping;
       t.wrapT=THREE.ClampToEdgeWrapping;
       t.repeat.set(1/6,1/3);
       t.offset.set(i/6,2/3);
       t.minFilter=THREE.LinearFilter;
       t.magFilter=THREE.LinearFilter;
       t.needsUpdate=true;
       return t;
     });
     setTextures(arr);
   });
 },[]);
 useFrame((state)=>{
   if(!group.current)return;
   const t=state.clock.elapsedTime;
   group.current.position.y=Math.sin(t*1.1)*0.055;
   group.current.rotation.x += ((-state.pointer.y*0.035)-group.current.rotation.x)*0.035;
   group.current.rotation.z += ((state.pointer.x*0.012)-group.current.rotation.z)*0.035;
 });
 useEffect(()=>{
   const timer=setInterval(()=>setView(v=>(v+1)%6),1700);
   return()=>clearInterval(timer);
 },[setView]);
 const change=e=>{
   e.stopPropagation();
   if(!drag.current.active)return;
   const dx=e.clientX-drag.current.x;
   if(Math.abs(dx)>8){
     setView(v=>(v+(dx<0?1:5))%6);
     drag.current.x=e.clientX;
   }
 };
 return <group ref={group} position={[0,-0.25,0]}
   onPointerDown={e=>{drag.current={active:true,x:e.clientX};e.stopPropagation()}}
   onPointerMove={change}
   onPointerUp={()=>drag.current.active=false}
   onPointerLeave={()=>drag.current.active=false}>
   {textures[view] && <group>
     <mesh position={[0,0.42,-0.08]} scale={[1.035,1.035,1]}>
       <planeGeometry args={[3.35,6.5]}/>
       <meshBasicMaterial map={textures[view]} transparent opacity={0.16} color="#18d7ff" depthWrite={false}/>
     </mesh>
     <mesh position={[0,0.42,0]}>
       <planeGeometry args={[3.35,6.5]}/>
       <meshBasicMaterial map={textures[view]} transparent alphaTest={0.02} side={THREE.DoubleSide} depthWrite={false}/>
     </mesh>
     <mesh position={[0,-2.78,-0.08]} rotation={[-Math.PI/2,0,0]}>
       <circleGeometry args={[1.55,64]}/>
       <meshBasicMaterial color="#03111f" transparent opacity={0.8}/>
     </mesh>
   </group>}
   <Torus args={[1.78,0.012,16,128]} rotation={[Math.PI/2,0,0]} position={[0,0.18,-0.25]}>
     <meshBasicMaterial color="#18d7ff" transparent opacity={0.7}/>
   </Torus>
   <Torus args={[2.08,0.009,16,128]} rotation={[Math.PI/2,0.35,0]} position={[0,0.18,-0.22]}>
     <meshBasicMaterial color="#8b5cf6" transparent opacity={0.48}/>
   </Torus>
 </group>
}
function Scene({onView}){return <Canvas camera={{position:[0,0.2,8],fov:34}} dpr={[1,1.6]} gl={{antialias:true,alpha:true}}>
 <ambientLight intensity={1.5}/><directionalLight position={[4,6,5]} intensity={2.4}/>
 <pointLight position={[-4,2,3]} intensity={18} color="#18d7ff" distance={9}/><pointLight position={[4,1,2]} intensity={15} color="#8b5cf6" distance={8}/>
 <Stars radius={28} depth={16} count={900} factor={1.3} saturation={0} fade speed={0.35}/>
 <Sparkles count={120} scale={[8,7,5]} size={1.5} speed={0.3} color="#77dcff"/>
 <Avatar3D onView={onView}/>
</Canvas>}

export default function Home(){
 const [view,setView]=useState(0);
 return <>
 <Head><title>Shahbaz Khan | IT Operations • Vibe Coder • AI Integrator</title><meta name="description" content="Muhammad Shahbaz Khan: IT Operations, retail technology, full-stack development, AI integration, automation and business systems."/></Head>
 <nav className="nav"><div className="wrap nav-inner"><div className="brand"><span className="brandmark">SK</span><span>Shahbaz Khan</span></div><div className="links"><a href="#about">About</a><a href="#work">Work</a><a href="#experience">Experience</a><a href="#skills">Skills</a><a href="#education">Education</a><a href="#contact">Contact</a></div><div className="status"><span className="dot"/> Available for work</div></div></nav>
 <main className="wrap">
  <section className="hero">
   <div className="hero-copy"><div className="eyebrow">IT × AI × AUTOMATION × 3D</div><h1>Hi, I’m<br/><span className="gradient">Shahbaz Khan.</span></h1><p>Technology professional combining real-world IT operations, retail systems, software development, AI integration, automation and business problem solving.</p><div className="actions"><a className="btn primary" href="#work">Explore my work →</a><a className="btn" href="#contact">Get in touch</a></div><div className="hero-mini"><span>IT Operations</span><span>Full-Stack</span><span>AI Integration</span><span>Vibe Coder</span></div></div>
   <div className="hero3d"><div className="scene-label">3D / INTERACTIVE AVATAR / VIEW {views[view]}°</div><Scene onView={setView}/><div className="drag">DRAG TO ROTATE • AUTO ORBIT</div><div className="avatar-badge"><b>Shahbaz Khan</b><small>IT Operations • Vibe Coder</small></div></div>
  </section>

  <div className="stats"><div className="stat"><b>95%</b><span>Tickets resolved within SLA</span></div><div className="stat"><b>50+</b><span>Regular retail stores</span></div><div className="stat"><b>PKR 12M+</b><span>Annual turnover managed</span></div><div className="stat"><b>3+ Days → Hours</b><span>Damage Note Sheet OCR workflow</span></div></div>

  <section id="about"><div className="section-head"><div><div className="eyebrow">01 / PROFILE</div><h2>Technology with operational depth.</h2></div><p>A career spanning camera monitoring, training, team leadership, IT support, enterprise ERP, business ownership, product architecture, full-stack development, AI integration and retail technology.</p></div><div className="grid3"><div className="card"><div className="num">01</div><h3>IT Operations</h3><p>POS, ERP, Windows Server, networking, VPN, DHCP, DNS, printers, CCTV, hardware/software troubleshooting and technology management.</p></div><div className="card"><div className="num">02</div><h3>Product Architecture</h3><p>Idea to deployment: UI/UX, architecture, backend systems, cloud integration, APIs and business workflows for SMEs and startups.</p></div><div className="card"><div className="num">03</div><h3>AI + Automation</h3><p>n8n workflows, OCR, Telegram bots, API automation, bilingual document generation and practical AI-enabled business processes.</p></div></div></section>

  <section id="work"><div className="section-head"><div><div className="eyebrow">02 / PROJECTS</div><h2>Real business systems.</h2></div><p>Projects documented in the resume, covering eCommerce, inventory, POS, ERP, HR attendance and document automation.</p></div><div className="grid3 project-grid">{projects.map(p=><article className="card project" key={p.n}><div className="project-top"><span className="num">{p.n}</span><span className="mono">{p.meta}</span></div><h3>{p.title}</h3><div className="tags">{p.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div><p>{p.desc}</p></article>)}</div></section>

  <section id="experience"><div className="section-head"><div><div className="eyebrow">03 / CAREER</div><h2>Camera Monitoring → IT → Products → AI.</h2></div><p>The full career history is retained here rather than compressing years of work into five vague cards.</p></div><div className="experience-list">{experience.map((e,i)=><article className="experience-item" key={i}><div className="exp-date">{e.date}</div><div><h3>{e.role}</h3><h4>{e.company}</h4><p className="exp-details">{e.details}</p><ul>{e.bullets.map((b,j)=><li key={j}>{b}</li>)}</ul></div></article>)}</div></section>

  <section id="skills"><div className="section-head"><div><div className="eyebrow">04 / TECHNICAL SKILLS</div><h2>Source-derived technical toolkit.</h2></div><p>Technology and operational capabilities listed in the supplied resume.</p></div><div className="grid2">{Object.entries(skills).map(([k,v])=><div className="card skill-card" key={k}><div className="num">/</div><h3>{k}</h3><div className="tags">{v.map(x=><span className="tag" key={x}>{x}</span>)}</div></div>)}</div></section>

  <section id="education"><div className="section-head"><div><div className="eyebrow">05 / EDUCATION & LANGUAGES</div><h2>Academic foundation.</h2></div><p>Education and language information retained from the supplied resume.</p></div><div className="grid2"><div className="card"><div className="num">EDU</div><h3>Master of Economics</h3><p>University of Sindh, Jamshoro • 2019</p><h3 style={{marginTop:24}}>Bachelor of Arts</h3><p>University of Sindh, Jamshoro</p></div><div className="card"><div className="num">LANG</div><h3>Urdu</h3><p>Native</p><h3 style={{marginTop:24}}>English</h3><p>Professional</p></div></div></section><section id="contact"><div className="contact"><div><div className="eyebrow">06 / CONTACT</div><h2>Let’s build something useful.</h2><p>Open to technology, automation, AI integration, product and IT opportunities.</p></div><div className="card contact-card"><p><b>Hyderabad, Pakistan</b></p><p>skyzai2009@gmail.com</p><p>linkedin.com/in/muhammd-shahbaz-khan-06429a377</p><p>github.com/Skyzai4u</p></div></div></section>
  <footer className="footer">© 2026 Muhammad Shahbaz Khan · IT Operations · Vibe Coder · AI Integrator · Product Architect</footer>
 </main>
 </>}
