/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Maximize2, 
  MousePointer2, 
  Square, 
  Pentagon, 
  Layers, 
  Settings, 
  HelpCircle, 
  Menu,
  ChevronRight,
  ChevronDown,
  Info,
  Car,
  User,
  TrafficCone,
  Languages,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ADAS_LABELS } from './terminology';

// Interactive Toggle Text Component
const ToggleText = ({ en, cn, className, block }: { en: string; cn: string; className?: string; block?: boolean }) => {
  const [showCn, setShowCn] = useState(false);
  return (
    <span 
      onClick={(e) => { e.stopPropagation(); setShowCn(!showCn); }}
      className={`cursor-help select-none transition-all ${showCn ? 'text-nvidia' : ''} ${block ? 'block' : ''} ${className}`}
      title="Click to translate | 点击翻译"
    >
      {showCn ? cn : en}
    </span>
  );
};

// Training Tip Component
const TrainingTip = ({ titleEn, titleCn, en, cn, tipEn, tipCn }: { titleEn: string; titleCn: string; en: string; cn: string; tipEn: string; tipCn: string }) => (
  <div className="rounded border border-blue-500/20 bg-blue-500/5 p-3 flex gap-3">
    <Info className="h-4 w-4 text-blue-500 shrink-0" />
    <div className="text-[10px] text-blue-200/80 leading-relaxed font-sans">
      <div className="font-bold text-blue-400 uppercase mb-1">
        <ToggleText en={titleEn} cn={titleCn} />
      </div>
      <div className="flex gap-2 mb-1">
        <span className="font-bold text-white tracking-wide">
          <ToggleText en={en} cn={cn} />
        </span>
      </div>
      <ToggleText en={tipEn} cn={tipCn} block />
    </div>
  </div>
);

export default function App() {
  const [activeTool, setActiveTool] = useState('select');
  const [selectedObject, setSelectedObject] = useState<string | null>('obj_001');
  const [showGlossary, setShowGlossary] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:04:38');

  const gridBackground = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='none'/%3E%3Cpath d='M0 50 L100 50 M50 0 L50 100' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/%3E%3C/svg%3E";

  return (
    <div className="grid h-screen w-full overflow-hidden bg-bg-dark text-text-main font-sans selection:bg-nvidia selection:text-black"
         style={{
           gridTemplateColumns: '1fr 280px',
           gridTemplateRows: '48px 1fr 140px',
           gridTemplateAreas: '"header header" "viewport sidebar" "timeline sidebar"'
         }}>
      
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border-dim bg-black px-4 shadow-md z-50" style={{ gridArea: 'header' }}>
        <div className="flex items-center gap-6">
          <div className="text-nvidia font-black tracking-tighter text-lg flex items-center gap-2 uppercase">
            <span>NVIDIA</span>
            <span className="bg-nvidia text-black px-1 rounded-sm text-sm">DRIVE<sup>&reg;</sup></span>
            <span className="text-text-dim text-xs font-normal tracking-widest ml-1">Annotator</span>
          </div>
          
          <div className="flex gap-6 border-l border-border-dim pl-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-nvidia uppercase leading-none mb-1">
                <ToggleText en="TASK ID" cn="任务编号" />
              </span>
              <span className="text-xs font-mono text-white leading-none">#NV-882-QX</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-nvidia uppercase leading-none mb-1">
                <ToggleText en="WORKFLOW" cn="工作流程" />
              </span>
              <span className="text-xs text-white leading-none">Detection (2D)</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-nvidia uppercase leading-none mb-1">
                <ToggleText en="PROGRESS" cn="当前进度" />
              </span>
              <span className="text-xs text-white leading-none">42 / 100</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowGlossary(true)}
            className="flex items-center gap-2 rounded border border-nvidia/50 bg-nvidia/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-nvidia transition-all hover:bg-nvidia/30 hover:shadow-[0_0_15px_rgba(118,185,0,0.3)] animate-pulse hover:animate-none"
          >
            <Languages className="h-3 w-3" />
            <ToggleText en="Open Glossary Table" cn="进入中英文对照表" />
          </button>
          <div className="flex h-8 items-center justify-center gap-2 rounded bg-nvidia px-4 py-1 text-[11px] font-bold text-black uppercase cursor-pointer hover:bg-opacity-90">
             <ToggleText en="SUBMIT" cn="提交任务" />
          </div>
        </div>
      </header>

      {/* Viewport Area */}
      <main className="relative bg-black flex items-center justify-center overflow-hidden border-r border-border-dim" style={{ gridArea: 'viewport', background: 'radial-gradient(circle at center, #222 0%, #050505 100%)' }}>
        <div 
          className="relative w-[90%] h-[90%] border border-white/5 bg-repeat shadow-2xl overflow-hidden"
          style={{ backgroundImage: `url("${gridBackground}")` }}
        >
          <img 
            src="https://picsum.photos/seed/driving_hq/1920/1080" 
            alt="Driving Scene" 
            className="h-full w-full object-cover opacity-70 mix-blend-screen"
            referrerPolicy="no-referrer"
          />
          
          {/* Mock Overlays */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Pedestrian */}
            <div 
              className={`absolute border-2 transition-all group cursor-pointer pointer-events-auto ${selectedObject === 'obj_002' ? 'border-nvidia bg-nvidia/20 ring-4 ring-nvidia/20' : 'border-nvidia bg-nvidia/10'}`} 
              style={{ top: '20%', left: '15%', width: '120px', height: '180px' }}
              onClick={() => setSelectedObject('obj_002')}
            >
              <div className="absolute -top-5 left-0 bg-nvidia px-1 text-[9px] font-bold text-black uppercase">
                <ToggleText en="PEDESTRIAN" cn="行人" />
              </div>
            </div>
            
            {/* Car */}
            <div 
              className={`absolute border-2 transition-all cursor-pointer pointer-events-auto ${selectedObject === 'obj_001' ? 'border-accent-blue bg-accent-blue/20 ring-4 ring-accent-blue/20' : 'border-accent-blue bg-accent-blue/10'}`} 
              style={{ top: '35%', left: '45%', width: '300px', height: '200px' }}
              onClick={() => setSelectedObject('obj_001')}
            >
              <div className="absolute -top-5 left-0 bg-accent-blue px-1 text-[9px] font-bold text-black uppercase">
                <ToggleText en="CAR" cn="小汽车" />
              </div>
            </div>

            {/* Traffic Light */}
            <div 
              className={`absolute border-2 transition-all cursor-pointer pointer-events-auto ${selectedObject === 'obj_003' ? 'border-red-500 bg-red-500/20 ring-4 ring-red-500/20' : 'border-red-500 bg-red-500/10'}`} 
              style={{ top: '15%', left: '60%', width: '40px', height: '80px' }}
              onClick={() => setSelectedObject('obj_003')}
            >
              <div className="absolute -top-5 left-0 bg-red-500 px-1 text-[9px] font-bold text-black uppercase">
                <ToggleText en="SIGNAL" cn="信号灯" />
              </div>
            </div>
          </div>
        </div>

        {/* Viewport Toolbar */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 bg-black/60 border border-border-dim p-1.5 rounded-sm backdrop-blur-md">
           <ToolButtonDensity active={activeTool === 'select'} icon={<MousePointer2 className="w-4 h-4" />} onClick={() => setActiveTool('select')} />
           <ToolButtonDensity active={activeTool === 'box2d'} icon={<Square className="w-4 h-4" />} onClick={() => setActiveTool('box2d')} />
           <ToolButtonDensity active={activeTool === 'poly'} icon={<Pentagon className="w-4 h-4" />} onClick={() => setActiveTool('poly')} />
        </div>
      </main>

      {/* Sidebar */}
      <aside className="bg-surface-dark border-l border-border-dim p-3 flex flex-col gap-6" style={{ gridArea: 'sidebar' }}>
        <div>
          <div className="flex items-center justify-between border-b border-border-dim pb-1 mb-2">
            <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest">
              <ToggleText en="Label Classes" cn="标注类别" />
            </span>
            <span className="text-[9px] text-nvidia/50 font-mono tracking-tighter">CLASSES</span>
          </div>
          <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[30vh] pr-1">
            <LabelClassItem en="Pedestrian" cn="行人" active={selectedObject === 'obj_002'} shortcut="1" />
            <LabelClassItem en="Two-Wheeler" cn="两轮车" active={false} shortcut="2" />
            <LabelClassItem en="Vehicle" cn="车辆" active={selectedObject === 'obj_001'} shortcut="3" />
            <LabelClassItem en="Traffic Sign" cn="交通标志" active={selectedObject === 'obj_003'} shortcut="4" />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-border-dim pb-1 mb-1">
            <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest">
              <ToggleText en="Attributes" cn="属性面板" />
            </span>
          </div>
          <div className="space-y-4 overflow-y-auto pr-1">
            <div className="space-y-1">
              <div className="text-[11px] text-text-dim">
                <ToggleText en="Occlusion" cn="遮挡程度" />
              </div>
              <select className="w-full bg-[#333] border border-[#444] text-xs px-2 py-1.5 focus:border-nvidia focus:outline-none rounded-sm">
                <option>None (无遮挡)</option>
                <option>Partial (部分遮挡)</option>
                <option>Heavy (严重遮挡)</option>
              </select>
            </div>

            <div className="space-y-1">
               <div className="text-[11px] text-text-dim">
                  <ToggleText en="Truncation" cn="截断程度" />
               </div>
               <label className="flex items-center gap-2 cursor-pointer group">
                 <input type="checkbox" className="accent-nvidia h-3.5 w-3.5 rounded-sm" />
                 <span className="text-[11px] text-text-main group-hover:text-nvidia transition-colors">
                    <ToggleText en="Is Truncated?" cn="是否截断?" />
                 </span>
               </label>
            </div>

            <div className="mt-8 space-y-3">
              <TrainingTip 
                titleEn="Vocab Focus" titleCn="核心词汇"
                en="Task ID & Workflow" cn="任务编号与流程"
                tipEn="Always double-check your Task ID and the current Workflow type (2D/3D) before starting."
                tipCn="开始工作前，请务必核对任务编号以及当前标注流程类型（2D/3D）。"
              />
              <TrainingTip 
                titleEn="Vocab Focus" titleCn="核心词汇"
                en="Truncation" cn="截断"
                tipEn="Truncation occurs when an object is partially outside the image frame."
                tipCn="截断是指物体的一部分位于图像边缘之外。请确保框刚好贴合图像边缘。"
              />
              <TrainingTip 
                titleEn="Vocab Focus" titleCn="核心词汇"
                en="Occlusion" cn="遮挡"
                tipEn="Always indicate if the object is partially or fully obscured by another object."
                tipCn="标注时须确认物体是否被其他物体完全或部分挡住。"
              />
            </div>
          </div>
        </div>

        <div className="text-[11px] text-gray-500 leading-normal border-t border-border-dim pt-3 italic">
          Tip: <ToggleText en="Pedestrians must include items they carry." cn="标注行人时应包含其随身携带的物品（如背包、伞）。" />
        </div>
      </aside>

      {/* Timeline */}
      <footer className="bg-[#111] border-t border-border-dim px-5 py-4 flex flex-col gap-3" style={{ gridArea: 'timeline' }}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
             <PlaybackBtn labelEn="PREV" labelCn="上个" />
             <PlaybackBtn labelEn="PLAY" labelCn="播放" active />
             <PlaybackBtn labelEn="NEXT" labelCn="下个" />
          </div>
          
          <div className="flex flex-col border-l border-border-dim pl-6 gap-0.5">
             <span className="text-[10px] text-text-dim uppercase font-bold tracking-tighter">
                <ToggleText en="Current Timestamp" cn="当前时间轴" />
             </span>
             <span className="text-lg font-mono text-white leading-tight">00:12:44.<span className="text-nvidia">254</span></span>
          </div>

          <div className="ml-auto text-xs text-text-dim flex gap-4 items-center">
            <span className="text-[9px] uppercase tracking-widest text-nvidia/50 border border-nvidia/20 px-1.5 py-0.5 rounded-sm hidden lg:block">
              Click any word to translate | 点击单词切换翻译
            </span>
            <div className="flex flex-col items-end">
               <span className="text-white font-mono leading-none">142 / 500</span>
               <span className="text-[8px] uppercase tracking-widest">
                  <ToggleText en="Frame Index" cn="帧序号" />
               </span>
            </div>
            <div className="h-4 w-[1px] bg-border-dim" />
            <div className="flex flex-col items-end">
               <span className="text-white font-mono leading-none">30 FPS</span>
               <span className="text-[8px] uppercase tracking-widest">
                  <ToggleText en="Rate" cn="速率" />
               </span>
            </div>
          </div>
        </div>

        <div className="relative h-10 w-full bg-black border border-border-dim rounded-sm overflow-hidden mt-1 group cursor-pointer">
           <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/10" />
           
           {/* Keyframes */}
           {[10, 15, 35, 60, 88].map(pos => (
             <div key={pos} className="absolute w-1.5 h-1.5 bg-accent-blue rotate-45 top-[17px] -ml-0.75 shadow-[0_0_5px_rgba(0,175,240,0.5)]" style={{ left: `${pos}%` }} />
           ))}
           
           {/* Playhead */}
           <div className="absolute top-0 bottom-0 w-[1px] bg-nvidia z-10" style={{ left: '35%' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-1.5 bg-nvidia rounded-b-sm" />
           </div>

           {/* Hover Seek */}
           <div className="absolute top-0 bottom-0 w-[1px] bg-white opacity-0 group-hover:opacity-30 z-5 transition-opacity pointer-events-none" />
        </div>
      </footer>

      {/* Glossary Modal */}
      <AnimatePresence>
        {showGlossary && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-8"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-surface-dark rounded border border-border-dim shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border-dim bg-black/40">
                <div className="flex items-center gap-4">
                  <div className="bg-nvidia/20 p-2 rounded-lg border border-nvidia/30 shadow-[0_0_15px_rgba(118,185,0,0.15)]">
                    <Languages className="h-6 w-6 text-nvidia" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                       ADAS <span className="text-nvidia">Glossary</span> Table
                    </h2>
                    <p className="text-[10px] text-text-dim uppercase tracking-widest font-bold">
                       Standardized English-Chinese Comparison Reference
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowGlossary(false)} 
                  className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-md transition-all border border-border-dim/50 group"
                  title="Close Modal"
                >
                  <Box className="h-5 w-5 rotate-45 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Table Body Area */}
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-nvidia/20 bg-black/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-dim/30">
                  {Object.entries(ADAS_LABELS).map(([category, items]) => (
                    <div key={category} className="bg-surface-dark flex flex-col">
                      <div className="bg-nvidia/5 px-6 py-3 border-b border-border-dim flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                          <Layers className="h-3 w-3 text-nvidia" />
                          <h3 className="text-[11px] font-black uppercase text-nvidia tracking-wider">
                            {(() => {
                              const config: Record<string, {en: string, cn: string}> = {
                                workflow_ui: { en: "Workflow & UI", cn: "基础工作界面" },
                                technical_tools: { en: "Tech Hardware", cn: "技术硬件工具" },
                                objects: { en: "Label Objects", cn: "目标物分类" },
                                attributes: { en: "Properties", cn: "属性配置" },
                                error_types: { en: "QC & Errors", cn: "质量控制报错" },
                                infrastructure: { en: "Infrastructure", cn: "道路基础设施" },
                                states: { en: "Movement", cn: "动态行驶状态" },
                                environment: { en: "Environment", cn: "环境场景" },
                                workflow_status: { en: "Status", cn: "项目任务状态" }
                              };
                              const match = config[category] || { en: category, cn: "词库" };
                              return `${match.en} (${match.cn})`;
                            })()}
                          </h3>
                        </div>
                        <CheckCircle2 className="h-3 w-3 text-nvidia/30" />
                      </div>
                      
                      <div className="divide-y divide-border-dim/20">
                        {items.map((item, idx) => (
                          <div key={idx} className="grid grid-cols-2 group hover:bg-nvidia/5 transition-all px-6 py-2.5 items-center">
                            <span className="text-sm font-bold text-white group-hover:text-nvidia transition-colors">
                              {item.en}
                            </span>
                            <span className="text-sm font-medium text-text-dim group-hover:text-white transition-colors border-l border-border-dim/30 pl-4 py-0.5">
                              {item.cn}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToolButtonDensity({ active, icon, onClick }: { active: boolean; icon: React.ReactNode; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`p-2 rounded-sm transition-all ${active ? 'bg-nvidia text-black shadow-lg shadow-nvidia/20' : 'text-text-dim hover:text-white hover:bg-white/5'}`}
    >
      {icon}
    </button>
  );
}

function LabelClassItem({ en, cn, active, shortcut }: { en: string; cn: string; active: boolean; shortcut: string }) {
  return (
    <div className={`group flex items-center justify-between p-2 rounded border cursor-pointer transition-all ${active ? 'border-nvidia bg-nvidia/10' : 'border-[#2a2a2a] bg-[#2a2a2a]/60 hover:bg-[#2a2a2a]'}`}>
      <div className="flex flex-col leading-tight">
        <span className={`text-[12px] font-bold ${active ? 'text-white' : 'text-text-dim group-hover:text-white'}`}>
          <ToggleText en={en} cn={cn} />
        </span>
      </div>
      <span className="text-[9px] font-mono text-text-dim opacity-50 bg-black/40 px-1.5 rounded-sm"> [ {shortcut} ] </span>
    </div>
  );
}

function PlaybackBtn({ labelEn, labelCn, active }: { labelEn: string; labelCn: string; active?: boolean }) {
  return (
    <button className={`flex flex-col items-center justify-center px-4 py-1.5 rounded border transition-all ${active ? 'bg-white/10 border-white/20' : 'bg-transparent border-transparent hover:bg-white/5'}`}>
      <span className="text-[10px] font-bold text-white uppercase leading-none mb-1">
        <ToggleText en={labelEn} cn={labelCn} />
      </span>
    </button>
  );
}
