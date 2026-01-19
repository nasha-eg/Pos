
import React, { useEffect, useState } from 'react';
import { CertificateData } from '../types';
import { getCertificateById, findCertificateByPublicInfo } from '../services/certificateService';
import CertificatePreview from './CertificatePreview';

interface VerificationViewProps {
  id: string | null;
  dataParam: string | null;
  navigate: (path: string) => void;
}

const VerificationView: React.FC<VerificationViewProps> = ({ id, dataParam, navigate }) => {
  const [cert, setCert] = useState<CertificateData | null>(null);
  const [searchCertNo, setSearchCertNo] = useState('');
  const [searchVerifyCode, setSearchVerifyCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const [error, setError] = useState('');
  const [showFull, setShowFull] = useState(false);

  const assets = {
    emblem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Emblem_of_the_United_Arab_Emirates.svg/1200px-Emblem_of_the_United_Arab_Emirates.svg.png',
    rating: 'https://es.moccae.gov.ae/Content/images/GlobalStarRating.png',
    bayanat: 'https://es.moccae.gov.ae/Content/images/Bayanat-logo.png',
    tawasul: 'https://es.moccae.gov.ae/Content/images/tawasul-logo.png',
    mysteryShopper: 'https://es.moccae.gov.ae/Content/images/mystery-shopper-logo.png',
    captcha: 'https://i.ibb.co/Xz9G1V9/captcha.png',
    moccaeFooter: 'https://es.moccae.gov.ae/Content/images/footer-moccae-logo.png',
    jae: 'https://es.moccae.gov.ae/Content/images/jae-logo.png',
    beeatna: 'https://es.moccae.gov.ae/Content/images/beeatna-logo.png'
  };

  useEffect(() => {
    if (id) {
      const data = getCertificateById(id);
      if (data) {
        setCert(data);
        setIsSearching(false);
      }
    }
  }, [id]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const result = findCertificateByPublicInfo(searchCertNo, searchVerifyCode);
    if (result) {
      setCert(result);
      setIsSearching(false);
    } else {
      setError('عذراً، لم يتم العثور على بيانات مطابقة. يرجى التأكد من المدخلات.');
    }
  };

  if (isSearching) {
    return (
      <div className="min-h-screen bg-[#fafafa] font-cairo flex flex-col text-[#333]" dir="rtl">
        {/* Top Header Section */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-[1200px] mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={assets.emblem} className="h-16" alt="UAE Emblem" />
              <img src={assets.rating} className="h-16 hidden sm:block" alt="Star Rating" />
            </div>
            <div className="flex items-center gap-6 text-[13px] font-bold text-gray-600">
              <div className="flex items-center gap-2 cursor-pointer hover:text-[#7da441]">
                <i className="fas fa-globe text-[#8b6b21]"></i> Language
              </div>
              <div className="flex gap-4">
                 <button className="hover:text-[#7da441]">عن الوزارة</button>
                 <button className="hover:text-[#7da441]">خدماتنا</button>
                 <button className="hover:text-[#7da441]">المعرفة</button>
              </div>
              <button onClick={() => navigate('#/')} className="text-gray-400 hover:text-black transition-colors"><i className="fas fa-home text-xl"></i></button>
            </div>
          </div>
        </header>

        {/* Main Content with Sidebar */}
        <main className="flex-1 max-w-[1200px] mx-auto w-full py-8 px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Right Side - Sidebar (Links Section from screenshot) */}
            <aside className="w-full md:w-[280px] space-y-4 order-2 md:order-2">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-[#f5f5f5] p-3 text-[14px] font-black border-b border-gray-200 text-gray-700">روابط هامة</div>
                <div className="divide-y divide-gray-100">
                  {['تسجيل دخول', 'رد الإيراد الإلكتروني', 'دليل استخدام الخدمات الرقمية', 'مركز الشهادات والتصاريح الرقمية'].map((link, i) => (
                    <div key={i} className={`p-3 text-[13px] font-bold flex justify-between items-center cursor-pointer hover:bg-slate-50 ${i === 3 ? 'bg-slate-100 text-[#7da441]' : 'text-gray-600'}`}>
                      {link}
                      <i className="fas fa-chevron-left text-[10px] opacity-30"></i>
                    </div>
                  ))}
                </div>
              </div>
              {/* Social/Tools Sidebar buttons */}
              <div className="grid grid-cols-4 gap-2">
                {['check-square', 'share-alt', 'rss', 'envelope'].map((icon, i) => (
                  <div key={i} className="aspect-square bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#7da441] cursor-pointer">
                    <i className={`fas fa-${icon}`}></i>
                  </div>
                ))}
              </div>
            </aside>

            {/* Left Side - Search Form Area */}
            <div className="flex-1 order-1 md:order-1">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-[12px] text-gray-400 font-bold mb-6">
                 <span>الصفحة الرئيسية</span>
                 <i className="fas fa-chevron-left text-[8px]"></i>
                 <span>مساحة العمل</span>
                 <i className="fas fa-chevron-left text-[8px]"></i>
                 <span className="text-gray-600">مركز الشهادات والتصاريح الرقمية</span>
              </div>

              <h2 className="text-[20px] font-black text-gray-800 mb-6 border-b-2 border-[#7da441] inline-block pb-1">مركز الشهادات والتصاريح الرقمية</h2>
              <p className="text-[13px] text-gray-500 font-bold leading-relaxed mb-10">
                يمكنك الآن التحقق من الشهادات أو التصاريح التي يتم إصدارها من وزارة التغير المناخي والبيئة من خلال إدخال رقم المستند (رقم الشهادة أو رقم التصريح) ثم إدخال كود التحقق المذكور على المستند. الحقول المشار إليها بعلامة ( * ) إلزامية.
              </p>

              <form onSubmit={handleSearch} className="space-y-6">
                {/* Certificate Number */}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <label className="md:w-32 text-[13px] font-black text-gray-700">رقم الشهادة *</label>
                  <div className="flex-1 relative">
                    <input 
                      required
                      value={searchCertNo} 
                      onChange={e => setSearchCertNo(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded px-4 py-2.5 text-[14px] focus:border-[#7da441] outline-none font-bold font-inter" 
                      dir="ltr"
                      placeholder="DXB-APH-02415-3286055"
                    />
                    <i className="fas fa-microphone absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"></i>
                  </div>
                </div>

                {/* Verification Code */}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <label className="md:w-32 text-[13px] font-black text-gray-700">رمز التحقق *</label>
                  <div className="flex-1 relative">
                    <input 
                      required
                      value={searchVerifyCode} 
                      onChange={e => setSearchVerifyCode(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded px-4 py-2.5 text-[14px] focus:border-[#7da441] outline-none font-bold font-inter" 
                      dir="ltr"
                      placeholder="322-7014"
                    />
                    <i className="fas fa-microphone absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"></i>
                  </div>
                </div>

                {/* Captcha Section */}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <label className="md:w-32 text-[13px] font-black text-gray-700">ادخل الأحرف الظاهرة *</label>
                  <div className="flex-1 flex gap-4">
                    <div className="relative flex-1">
                      <input 
                        required
                        value={captchaInput}
                        onChange={e => setCaptchaInput(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded px-4 py-2.5 text-[14px] outline-none focus:border-[#7da441]"
                      />
                      <i className="fas fa-microphone absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"></i>
                      <i className="fas fa-info-circle absolute -right-6 top-1/2 -translate-y-1/2 text-amber-500 text-[12px]"></i>
                    </div>
                    <div className="flex items-center gap-2">
                       <img src={assets.captcha} className="h-10 border border-gray-200 rounded" alt="Captcha" />
                       <button type="button" className="text-gray-400 hover:text-black"><i className="fas fa-sync-alt"></i></button>
                    </div>
                  </div>
                </div>

                {error && <div className="text-red-500 text-[12px] font-bold mt-2 pr-36">{error}</div>}

                {/* Form Buttons */}
                <div className="flex justify-start gap-4 pr-36 pt-4">
                  <button type="submit" className="bg-[#8b6b21] hover:bg-black text-white px-8 py-2 rounded text-[14px] font-black transition-colors">إرسال</button>
                  <button type="reset" onClick={() => {setSearchCertNo(''); setSearchVerifyCode(''); setError('')}} className="bg-gray-400 hover:bg-black text-white px-8 py-2 rounded text-[14px] font-black transition-colors">مسح</button>
                </div>
              </form>

              {/* Partner Logos from screenshot */}
              <div className="grid grid-cols-3 gap-6 mt-20">
                 <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
                    <img src={assets.bayanat} className="h-10" alt="Bayanat" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Official Data Portal</span>
                 </div>
                 <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
                    <img src={assets.tawasul} className="h-10" alt="Tawasul" />
                    <span className="text-[10px] font-black text-gray-400 font-inter">04 7771777</span>
                 </div>
                 <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
                    <img src={assets.mysteryShopper} className="h-10" alt="Mystery Shopper" />
                    <span className="text-[10px] font-black text-gray-400">UAE MYSTERY SHOPPER</span>
                 </div>
              </div>
            </div>
          </div>
        </main>

        {/* Realistic Ministry Footer Section */}
        <footer className="bg-white border-t border-gray-200 mt-20">
          <div className="max-w-[1200px] mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-100">
            <div className="space-y-6">
              <img src={assets.moccaeFooter} className="h-14 opacity-80" alt="MOCCAE Logo" />
              <img src={assets.jae} className="h-12 opacity-80" alt="JAE Logo" />
              <img src={assets.beeatna} className="h-14 opacity-80" alt="Beeatna Logo" />
            </div>
            <div>
              <h4 className="text-[#8b6b21] font-black text-[15px] mb-6">عن الموقع</h4>
              <ul className="text-[12px] font-bold text-gray-500 space-y-3">
                <li>حقوق النسخ</li>
                <li>سياسة الخصوصية</li>
                <li>الشروط والأحكام</li>
                <li>إخلاء المسؤولية</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#8b6b21] font-black text-[15px] mb-6">روابط سريعة</h4>
              <ul className="text-[12px] font-bold text-gray-500 space-y-3">
                <li>النشرة الإخبارية</li>
                <li>الصفحة الرئيسية</li>
                <li>بريد الموظفين</li>
                <li>بوابتي</li>
                <li>الوظائف</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#8b6b21] font-black text-[15px] mb-6">تواصل معنا</h4>
              <ul className="text-[12px] font-bold text-gray-500 space-y-3">
                 <li className="flex items-center gap-2"><i className="fas fa-phone-alt"></i> 800 30 50</li>
                 <li className="flex items-center gap-2"><i className="fas fa-map-marker-alt"></i> مراكز سعادة المتعاملين</li>
              </ul>
            </div>
          </div>
          <div className="max-w-[1200px] mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-400">
             <div>حقوق الطبع © 2024 وزارة التغير المناخي والبيئة. جميع الحقوق محفوظة.</div>
             <div className="flex gap-4 mt-4 md:mt-0 text-[16px]">
               <i className="fab fa-facebook-f hover:text-[#7da441] cursor-pointer"></i>
               <i className="fab fa-twitter hover:text-[#7da441] cursor-pointer"></i>
               <i className="fab fa-instagram hover:text-[#7da441] cursor-pointer"></i>
               <i className="fab fa-youtube hover:text-[#7da441] cursor-pointer"></i>
               <i className="fab fa-linkedin-in hover:text-[#7da441] cursor-pointer"></i>
             </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-cairo flex flex-col" dir="rtl">
       <header className="h-20 bg-white border-b px-10 flex items-center justify-between sticky top-0 z-50">
          <button onClick={() => setIsSearching(true)} className="text-[#7da441] font-black flex items-center gap-3 group">
            <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i> عودة للبحث
          </button>
          <div className="flex gap-4">
            <button onClick={() => setShowFull(!showFull)} className="bg-slate-800 text-white px-6 py-2.5 rounded-xl font-bold text-sm">
               {showFull ? 'عرض الملخص' : 'عرض الشهادة الكاملة'}
            </button>
            <button onClick={() => window.print()} className="bg-[#7da441] text-white px-6 py-2.5 rounded-xl font-bold text-sm"><i className="fas fa-print ml-2"></i> طباعة</button>
          </div>
       </header>

       <main className="flex-1 p-6 md:p-12 flex justify-center">
          {showFull ? (
            <div className="origin-top scale-[0.6] md:scale-90 lg:scale-100 transform transition-all">
              <CertificatePreview data={cert!} />
            </div>
          ) : (
            <div className="max-w-4xl w-full bg-white rounded-[50px] shadow-2xl border border-white overflow-hidden animate-fade-in">
               <div className="bg-[#7da441] p-16 text-white flex flex-col md:flex-row justify-between items-center gap-10">
                  <div className="flex items-center gap-8">
                     <div className="w-24 h-24 bg-white/20 rounded-[35px] flex items-center justify-center backdrop-blur-md shadow-2xl border border-white/30">
                        <i className="fas fa-check text-4xl"></i>
                     </div>
                     <div>
                        <h2 className="text-4xl font-black mb-2">تم التحقق بنجاح</h2>
                        <p className="text-xl opacity-80 font-bold">المستند صالح ومطابق للسجلات الرسمية</p>
                     </div>
                  </div>
                  <div className="text-8xl font-black opacity-10 select-none hidden lg:block tracking-widest font-inter">VERIFIED</div>
               </div>

               <div className="p-16 grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-10">
                     <h3 className="text-xl font-black text-[#7da441] border-r-4 border-[#7da441] pr-4">تفاصيل الوثيقة</h3>
                     <div className="space-y-4">
                        <div className="flex justify-between pb-4 border-b border-slate-50"><span className="text-slate-400 font-bold">رقم الشهادة</span><span className="font-black text-slate-800 font-inter">{cert?.certNo}</span></div>
                        <div className="flex justify-between pb-4 border-b border-slate-50"><span className="text-slate-400 font-bold">تاريخ الإصدار</span><span className="font-black text-slate-800">{cert?.dateOfIssue}</span></div>
                        <div className="flex justify-between pb-4 border-b border-slate-50"><span className="text-slate-400 font-bold">الموظف المعتمد</span><span className="font-black text-slate-800">{cert?.officerName}</span></div>
                     </div>
                  </div>
                  <div className="space-y-10">
                     <h3 className="text-xl font-black text-[#7da441] border-r-4 border-[#7da441] pr-4">معلومات الإرسالية</h3>
                     <div className="space-y-4">
                        <div className="flex justify-between pb-4 border-b border-slate-50"><span className="text-slate-400 font-bold">دولة المقصد</span><span className="font-black text-slate-800">{cert?.toOrg}</span></div>
                        <div className="flex justify-between pb-4 border-b border-slate-50"><span className="text-slate-400 font-bold">الكمية الكلية</span><span className="font-black text-slate-800">{cert?.totalQuantity}</span></div>
                        <div className="flex justify-between pb-4 border-b border-slate-50"><span className="text-slate-400 font-bold">نقطة الدخول</span><span className="font-black text-slate-800">{cert?.pointOfEntry}</span></div>
                     </div>
                  </div>
                  <div className="col-span-full">
                     <h3 className="text-xl font-black text-slate-800 mb-6">اسم وعنوان المصدر المعتمد</h3>
                     <div className="p-8 bg-slate-50 rounded-[35px] border border-slate-100 font-black text-lg leading-relaxed text-slate-700 uppercase font-inter">
                        {cert?.exporterNameAddress}
                     </div>
                  </div>
               </div>

               <div className="p-12 text-center bg-slate-50 border-t border-white flex flex-col items-center gap-6">
                  <img src={assets.emblem} className="h-14 opacity-20 grayscale" />
                  <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.5em]">United Arab Emirates - MOCCAE Official Digital Document</p>
               </div>
            </div>
          )}
       </main>
    </div>
  );
};

export default VerificationView;
