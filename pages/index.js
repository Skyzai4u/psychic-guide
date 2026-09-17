import Head from 'next/head';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles, Torus, Stars } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { AVATAR_SPRITE } from '../lib/avatar';

const projects = [
  ['01','ShahOptics','React • Supabase • WhatsApp','Web + mobile optical store platform with catalogue, inventory and ordering workflows.'],
  ['02','Ziyqa Falooda ERP/POS','React • Node.js • PostgreSQL','ERP and POS solution covering inventory, sales, purchasing and operational reporting.'],
  ['03','LoopKart','Next.js • Supabase • Auth','Multi-role commerce platform with POS, invoices, product workflows and WhatsApp ordering.'],
  ['04','POS SOLUTION','Android • Multi-tenant • WhatsApp','Cross-industry Android POS with company isolation, invoicing and messaging support.'],
  ['05','Damage Sheet OCR','OCR • AX • Automation','Converted image-heavy damage-sheet processing into a much faster scan, OCR and verification workflow.'],
  ['06','IT Operations','Networking • Firewalls • Windows','Hands-on store technology operations across POS, servers, connectivity, security and support.']
];

function AvatarRig({ frame, setFrame }) {
  const group = useRef();
  const plane = useRef();
  const texture = useRef();
  const drag = useRef({ active:false, x:0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(AVATAR_SPRITE, (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.ClampToEdgeWrapping;
      t.repeat.set(1/6, 1);
      t.offset.set(frame/6, 0);
      texture.current = t;
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (texture.current) texture.current.offset.x = frame / 6;
  }, [frame]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y += ((state.pointer.x * 0.11) - group.current.rotation.y) * 0.035;
      group.current.rotation.x += ((-state.pointer.y * 0.045) - group.current.rotation.x) * 0.035;
      group.current.position.y = Math.sin(t * 1.1) * 0.035;
    }
    if (plane.current) plane.current.scale.y = 1 + Math.sin(t * 1.3) * 0.008;
  });

  const onPointerDown = (e) => { drag.current={active:true,x:e.clientX}; e.stopPropagation(); };
  const onPointerMove = (e) => {
    if(!drag.current.active) return;
    const dx=e.clientX-drag.current.x;
    if(Math.abs(dx)>18){ setFrame((frame + (dx>0 ? -1 : 1) + 6)%6); drag.current.x=e.clientX; }
  };
  const stop=()=>{drag.current.active=false};

  return <group ref={group} position={[0,-0.35,0]}>
    <Float speed={1.15} rotationIntensity={0.06} floatIntensity={0.15}>
      <mesh ref={plane} position={[0,0.35,0]} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={stop} onPointerOut={stop}>
        <planeGeometry args={[3.05,5.15]} />
        <meshStandardMaterial transparent map={loaded ? texture.current : null} alphaTest={0.04} roughness={0.72} metalness={0.08} side={THREE.DoubleSide} />
      </mesh>
    </Float>
    <Torus args={[1.75,0.008,12,128]} rotation={[Math.PI/2.05,0.05,0]} position={[0,0.35,-0.15]}>
      <meshBasicMaterial color="#18d7ff" transparent opacity={0.5} />
    </Torus>
    <Torus args={[1.98,0.006,12,128]} rotation={[Math.PI/2.05,0.2,0]} position={[0,0.35,-0.2]}>
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.38} />
    </Torus>
  </group>;
}

function Scene({ frame, setFrame }) {
  return <Canvas camera={{position:[0,0.3,7.4],fov:36}} dpr={[1,1.7]} gl={{antialias:true,alpha:true}}>
    <ambientLight intensity={1.8}/><directionalLight position={[3,5,4]} intensity={3}/><pointLight position={[-4,1,2]} intensity={18} color="#1ad8ff" distance={8}/><pointLight position={[4,-2,1]} intensity={13} color="#8b5cf6" distance={7}/>
    <Stars radius={30} depth={12} count={700} factor={1.2} saturation={0} fade speed={0.5}/>
    <Sparkles count={90} scale={[8,6,4]} size={1.6} speed={0.25} color="#70d9ff"/>
    <AvatarRig frame={frame} setFrame={setFrame}/>
    <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.35} minPolarAngle={Math.PI/2.2} maxPolarAngle={Math.PI/1.9}/>
  </Canvas>;
}

export default function Home(){
  const [frame,setFrame]=useState(0);
  return <>
    <Head><title>Shahbaz Khan | 3D Portfolio</title><meta name="description" content="Shahbaz Khan, IT Operations Executive, Vibe Coder, Full-Stack Developer and AI Integrator."/><meta name="viewport" content="width=device-width, initial-scale=1"/></Head>
    <nav className="nav"><div className="wrap" style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'space-between'}}><div className="brand"><span className="brandmark">SK</span><span>Shahbaz Khan</span></div><div className="links"><a href="#about">About</a><a href="#work">Work</a><a href="#experience">Experience</a><a href="#skills">Skills</a><a href="#contact">Contact</a></div><div className="status"><span className="dot"/> Available for work</div></div></nav>
    <main className="wrap">
      <section className="hero">
        <div><div className="eyebrow">IT × AI × Automation × 3D</div><h1>Hi, I'm<br/><span className="gradient">Shahbaz Khan.</span></h1><p>IT Operations Executive, Vibe Coder and product-focused technologist building modern business systems, automation workflows and practical AI integrations.</p><div className="actions"><a className="btn primary" href="#work">Explore my work →</a><a className="btn" href="#contact">Get in touch</a></div></div>
        <div className="hero3d"><div className="scene-label">03D / INTERACTIVE AVATAR / VIEW {frame*45}°</div><Scene frame={frame} setFrame={setFrame}/><div className="drag">DRAG TO ROTATE • AUTO ORBIT</div></div>
      </section>
      <div className="stats"><div className="stat"><b>9+</b><span>Years of technology experience</span></div><div className="stat"><b>15+</b><span>Projects and systems delivered</span></div><div className="stat"><b>10+</b><span>Happy business clients</span></div><div className="stat"><b>100%</b><span>Focus on practical outcomes</span></div></div>

      <section id="about"><div className="section-head"><div><div className="eyebrow">01 / Profile</div><h2>Technology with a business brain.</h2></div><p>From store IT operations to full-stack products, I work across the layer where infrastructure, software, automation and business processes meet.</p></div><div className="grid3"><div className="card"><div className="num">01</div><h3>IT Operations</h3><p>POS, AX, Windows, networking, firewalls, connectivity, hardware support and operational troubleshooting.</p></div><div className="card"><div className="num">02</div><h3>Vibe Coding</h3><p>Rapidly turning business requirements into usable web and mobile products with modern AI-assisted development.</p></div><div className="card"><div className="num">03</div><h3>AI + Automation</h3><p>OCR, workflow automation, APIs, n8n and AI integrations designed around measurable time savings.</p></div></div></section>

      <section id="work"><div className="section-head"><div><div className="eyebrow">02 / Selected work</div><h2>Products, not just screenshots.</h2></div><p>A practical portfolio of ERP, POS, commerce, optical retail and automation systems built around real operational needs.</p></div><div className="grid3">{projects.map(([n,t,tags,desc])=><article className="card" key={n}><div className="num">{n}</div><h3>{t}</h3><div className="tags">{tags.split(' • ').map(x=><span className="tag" key={x}>{x}</span>)}</div><p>{desc}</p></article>)}</div></section>

      <section id="experience"><div className="section-head"><div><div className="eyebrow">03 / Career</div><h2>Support → systems → products.</h2></div><p>A career that moved from operational and technology support into product building, automation and modern IT leadership.</p></div><div className="timeline"><div className="timeline-grid"><div className="role"><small>2025 — PRESENT</small><h4>IT Executive</h4><p>Bachaaparty<br/>Retail Technology</p></div><div className="role"><small>2022 — 2025</small><h4>Help Desk Engineer</h4><p>Logical Technologist<br/>International Clients</p></div><div className="role"><small>2018 — PRESENT</small><h4>Founder / Vibe Coder</h4><p>FactsSolution<br/>Full-Stack + AI</p></div><div className="role"><small>2015 — 2021</small><h4>Sales & Distribution</h4><p>Airox / SkyMobi<br/>Operations & Retail</p></div><div className="role"><small>EARLIER</small><h4>IT / Training</h4><p>Basecamp / Oxiliry<br/>Support & Training</p></div></div></div></section>

      <section id="skills"><div className="section-head"><div><div className="eyebrow">04 / Toolkit</div><h2>Modern stack. Practical mindset.</h2></div><p>Technologies used across products, integrations and IT operations.</p></div><div className="grid3"><div className="card"><h3>Frontend + 3D</h3><div className="tags">{['React','Next.js','Three.js','R3F','Tailwind CSS','HTML/CSS'].map(x=><span className="tag" key={x}>{x}</span>)}</div></div><div className="card"><h3>Backend + Data</h3><div className="tags">{['Node.js','PostgreSQL','Supabase','Firebase','REST APIs','SQL Server'].map(x=><span className="tag" key={x}>{x}</span>)}</div></div><div className="card"><h3>Automation + IT</h3><div className="tags">{['n8n','OCR','AI Workflows','Fortinet','MikroTik','Windows Server','Vercel'].map(x=><span className="tag" key={x}>{x}</span>)}</div></div></div></section>

      <section id="contact"><div className="contact"><div><div className="eyebrow">05 / Contact</div><h2 style={{fontSize:42,letterSpacing:'-.04em'}}>Let's build something useful.</h2><p style={{color:'var(--muted)',lineHeight:1.8}}>Open to technology, automation, AI integration and product opportunities.</p></div><div className="card"><p className="mono" style={{color:'var(--cyan)'}}>LINKS</p><p>LinkedIn · linkedin.com/in/muhammd-shahbaz-khan-06429a377/</p><p>GitHub · github.com/Skyzai4u</p><p>Portfolio · shahbaz-khan-portfolio</p></div></div></section>
      <footer className="footer">© 2026 Shahbaz Khan · IT Executive · Vibe Coder · Full-Stack Developer</footer>
    </main>
  </>;
}
