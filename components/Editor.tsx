
import React, { useState, useEffect } from 'react';
import { CertificateData, CertificateItem, CertificateLabels } from '../types';
import { getCertificateById, saveCertificate, generateId, DEFAULT_LABELS } from '../services/certificateService';
import CertificatePreview from './CertificatePreview';

interface EditorProps {
  id?: string;
  navigate: (path: string) => void;
}

const Editor: React.FC<EditorProps> = ({ id, navigate }) => {
  const defaultCertState: CertificateData = {
    id: generateId(),
    certNo: `DXB-APH-02415-3286055`,
    verificationCode: `322-7014`,
    fromOrg: 'United Arab Emirates',
    toOrg: 'Kingdom of Saudi Arabia',
    exporterNameAddress: 'SYTRWL VEGETABLES AND FRUITS TRADING CO - دبي سوق\n- UAE',
    importerNameAddress: 'مؤسسة بستان دارين للخضار والفواكه - السعودية',
    distinguishingMarks: 'NIL',
    pointOfEntry: 'الدمام',
    endUsePurpose: 'Consumption',
    meansOfConveyance: 'By Road 74635',
    importPermitNo: 'NIL',
    totalQuantity: '22200 kg(s)',
    totalNoOfPackages: '3510',
    items: [
      { id: generateId(), scientificName: 'Actinidia deliciosa', commonName: 'Kiwi', origin: 'Chile', pcNo: '2339658', quantity: '1500 KG', noOfPackages: '104', commodityClass: 'Fruits and vegetables' },
      { id: generateId(), scientificName: 'Capsicum spp.', commonName: 'Peppers', origin: 'China', pcNo: '225N670200', quantity: '1000 KG', noOfPackages: '100', commodityClass: 'Fruits and vegetables' },
    ],
    additionalDeclaration: 'NIL',
    disinfestation: {
      chemicals: 'NIL',
      durationTemp: 'NIL',
      treatmentDate: 'NIL',
      treatment: 'NIL',
      concentrationRate: 'NIL',
      additionalInfo: 'NIL'
    },
    placeOfIssue: 'Customer Happiness Center - Dubai',
    dateOfIssue: '11-01-2026',
    dateOfInspection: '11-01-2026',
    officerName: 'Hassan Saeed Al-Younes',
    createdAt: Date.now(),
    logoCenter: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Emblem_of_the_United_Arab_Emirates.svg/1200px-Emblem_of_the_United_Arab_Emirates.svg.png',
    captchaImage: 'https://i.ibb.co/Xz9G1V9/captcha.png',
    portalFooterLogo1: 'https://es.moccae.gov.ae/Content/images/Bayanat-logo.png',
    portalFooterLogo2: 'https://es.moccae.gov.ae/Content/images/tawasul-logo.png',
    portalFooterLogo3: 'https://es.moccae.gov.ae/Content/images/mystery-shopper-logo.png',
    labels: DEFAULT_LABELS
  };

  const [cert, setCert] = useState<CertificateData>(defaultCertState);
  const [activeTab, setActiveTab] = useState<'main' | 'items' | 'treatment' | 'branding' | 'text'>('main');

  useEffect(() => {
    if (id) {
      const existing = getCertificateById(id);
      if (existing) setCert(existing);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('labels.')) {
      const field = name.split('.')[1];
      setCert(prev => ({ ...prev, labels: { ...prev.labels, [field]: value } }));
    } else if (name.startsWith('disinfestation.')) {
      const field = name.split('.')[1];
      setCert(prev => ({ ...prev, disinfestation: { ...prev.disinfestation, [field]: value } }));
    } else {
      setCert(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (field: keyof CertificateData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCert(prev => ({ ...prev, [field]: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleItemChange = (itemId: string, field: keyof CertificateItem, value: string) => {
    setCert(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === itemId ? { ...item, [field]: value } : item)
    }));
  };

  const addItem = () => {
    setCert(prev => ({ ...prev, items: [...prev.items, { ...defaultCertState.items[0], id: generateId(), scientificName: '', commonName: '' }] }));
  };

  const handleSave = () => {
    saveCertificate(cert);
    alert('تم الحفظ بنجاح');
    navigate('#/');
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900 font-cairo overflow-hidden" dir="rtl">
      {/* Dark Header */}
      <header className="flex-none h-20 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('#/')} className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all text-slate-300">
            <i className="fas fa-chevron-right"></i>
          </button>
          <div>
            <h1 className="text-white font-black text-lg">محرر الوثيقة الرقمية</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-inter">{cert.certNo}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/50 p-1 rounded-2xl border border-slate-700">
          {[
            { id: 'main', label: 'الأساسية', icon: 'file-invoice' },
            { id: 'items', label: 'الأصناف', icon: 'list-ul' },
            { id: 'treatment', label: 'المعاملة', icon: 'flask' },
            { id: 'branding', label: 'الأختام', icon: 'stamp' },
            { id: 'text', label: 'النصوص', icon: 'language' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-[#7da441] text-white shadow-lg shadow-green-900/40' : 'text-slate-400 hover:text-white'}`}
            >
              <i className={`fas fa-${tab.icon}`}></i>
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <button onClick={handleSave} className="bg-white text-slate-900 px-8 py-2.5 rounded-xl font-black text-sm shadow-xl hover:bg-slate-100 transition-all flex items-center gap-2">
          <i className="fas fa-save"></i>
          حفظ السجل
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden flex-row-reverse" dir="ltr">
        {/* Editor Pane (Left Side in LTR container) */}
        <div className="w-[450px] xl:w-[550px] bg-white overflow-y-auto p-8 custom-scrollbar" dir="rtl">
          <div className="space-y-10">
            {activeTab === 'main' && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">رقم الشهادة</label>
                    <input name="certNo" value={cert.certNo} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-black focus:border-[#7da441] outline-none" dir="ltr" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">رمز التحقق</label>
                    <input name="verificationCode" value={cert.verificationCode} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-black focus:border-[#7da441] outline-none" dir="ltr" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">المصدر (EN)</label>
                  <textarea name="exporterNameAddress" value={cert.exporterNameAddress} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold h-24 uppercase font-inter leading-relaxed" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">المستورد (AR)</label>
                  <textarea name="importerNameAddress" value={cert.importerNameAddress} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold h-24 leading-relaxed" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">دولة المقصد</label>
                    <input name="toOrg" value={cert.toOrg} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">نقطة الدخول</label>
                    <input name="pointOfEntry" value={cert.pointOfEntry} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">تاريخ الإصدار</label>
                    <input name="dateOfIssue" value={cert.dateOfIssue} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">الموظف المختص</label>
                    <input name="officerName" value={cert.officerName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'items' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-black text-slate-800">قائمة الأصناف</h3>
                  <button onClick={addItem} className="text-[#7da441] font-bold text-xs flex items-center gap-2"><i className="fas fa-plus-circle"></i> إضافة صنف</button>
                </div>
                <div className="space-y-4">
                  {cert.items.map((item, idx) => (
                    <div key={item.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                      <button onClick={() => setCert(p => ({...p, items: p.items.filter(i => i.id !== item.id)}))} className="absolute top-4 left-4 text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"><i className="fas fa-trash"></i></button>
                      <span className="text-[10px] font-black text-slate-300 mb-2 block">{idx + 1}. Item</span>
                      <div className="grid grid-cols-2 gap-3">
                        <input placeholder="Scientific Name" value={item.scientificName} onChange={e => handleItemChange(item.id, 'scientificName', e.target.value)} className="col-span-2 bg-white border border-slate-200 rounded-lg p-2 text-xs italic font-bold uppercase" />
                        <input placeholder="الاسم العام" value={item.commonName} onChange={e => handleItemChange(item.id, 'commonName', e.target.value)} className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold" />
                        <input placeholder="المنشأ" value={item.origin} onChange={e => handleItemChange(item.id, 'origin', e.target.value)} className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold" />
                        <input placeholder="PC No." value={item.pcNo} onChange={e => handleItemChange(item.id, 'pcNo', e.target.value)} className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold font-inter" />
                        <input placeholder="الكمية" value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', e.target.value)} className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'treatment' && (
              <div className="space-y-6">
                <h3 className="font-black text-slate-800">المعاملة للتطهير</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">الكيماويات</label>
                    <input name="disinfestation.chemicals" value={cert.disinfestation.chemicals} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">درجة الحرارة</label>
                      <input name="disinfestation.durationTemp" value={cert.disinfestation.durationTemp} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">تاريخ المعاملة</label>
                      <input name="disinfestation.treatmentDate" value={cert.disinfestation.treatmentDate} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">معلومات إضافية</label>
                    <textarea name="disinfestation.additionalInfo" value={cert.disinfestation.additionalInfo} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold h-32 leading-relaxed" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'branding' && (
              <div className="space-y-8">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <label className="text-xs font-black text-slate-800 block mb-4">شعار الوزارة</label>
                  <input type="file" onChange={handleImageUpload('logoCenter')} className="w-full text-xs" />
                  <div className="mt-4 flex justify-center bg-white p-4 rounded-xl border border-slate-100"><img src={cert.logoCenter} className="h-20 object-contain" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <label className="text-xs font-black text-slate-800 block mb-4">الختم الرسمي</label>
                    <input type="file" onChange={handleImageUpload('officialStamp')} className="w-full text-xs" />
                    <div className="mt-4 h-32 bg-white flex items-center justify-center rounded-xl border border-slate-100 overflow-hidden">{cert.officialStamp && <img src={cert.officialStamp} className="h-full object-contain mix-blend-multiply" />}</div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <label className="text-xs font-black text-slate-800 block mb-4">توقيع الموظف</label>
                    <input type="file" onChange={handleImageUpload('officerSignature')} className="w-full text-xs" />
                    <div className="mt-4 h-32 bg-white flex items-center justify-center rounded-xl border border-slate-100 overflow-hidden">{cert.officerSignature && <img src={cert.officerSignature} className="h-full object-contain mix-blend-multiply" />}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'text' && (
              <div className="space-y-6">
                <h3 className="font-black text-slate-800">تعديل قوالب النصوص</h3>
                <div className="space-y-4">
                  {Object.keys(cert.labels).slice(0, 15).map(key => (
                    <div key={key} className="space-y-1">
                      <label className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">{key}</label>
                      <input 
                        name={`labels.${key}`} 
                        value={cert.labels[key as keyof CertificateLabels] as string} 
                        onChange={handleChange} 
                        className="w-full bg-slate-50 border border-slate-100 rounded-lg p-2 text-xs font-bold" 
                      />
                    </div>
                  ))}
                  <p className="text-[10px] text-slate-400 italic">ملاحظة: تظهر فقط الحقول الأساسية هنا، الباقي يتم حفظه تلقائياً.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Pane (Right Side in LTR container) */}
        <div className="flex-1 bg-slate-800 flex flex-col items-center justify-start p-10 overflow-y-auto no-print">
          <div className="mb-10 flex gap-4">
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-white text-sm font-bold flex items-center gap-3">
              <i className="fas fa-sync-alt animate-spin text-[#7da441]"></i>
              معاينة حية ذكية
            </div>
            <button onClick={() => window.print()} className="bg-[#7da441] text-white px-8 py-3 rounded-full text-sm font-black shadow-xl hover:bg-[#6a8d36] transition-all flex items-center gap-2">
              <i className="fas fa-file-pdf"></i>
              تصدير PDF
            </button>
          </div>
          <div className="origin-top scale-[0.45] xl:scale-[0.55] 2xl:scale-[0.8] shadow-[0_40px_100px_rgba(0,0,0,0.5)] transition-all">
            <CertificatePreview data={cert} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
