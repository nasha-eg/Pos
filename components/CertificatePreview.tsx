
import React from 'react';
import { CertificateData } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { encodeDataForQR } from '../services/certificateService';

interface CertificatePreviewProps {
  data: CertificateData;
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({ data }) => {
  const qrValue = encodeDataForQR(data);
  const { labels } = data;

  const PageHeader = () => (
    <div className="w-full shrink-0 mb-3" dir="ltr">
      <div className="flex justify-between items-center px-1 mb-2">
        {/* English Header (Left) */}
        <div className="w-[42%] text-left">
          <div className="text-[#8b6b21] font-black leading-tight">
            <h1 className="text-[12px] uppercase tracking-tighter whitespace-pre-line font-black font-inter">{labels.headerEn1}</h1>
            <h2 className="text-[9px] uppercase mt-0.5 whitespace-pre-line font-bold font-inter leading-tight">{labels.headerEn2}</h2>
          </div>
        </div>
        {/* Logo (Center) */}
        <div className="w-[16%] flex justify-center">
          <img 
            src={data.logoCenter || "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Emblem_of_the_United_Arab_Emirates.svg/1200px-Emblem_of_the_United_Arab_Emirates.svg.png"} 
            className="h-[70px] w-auto object-contain" 
            alt="Emblem" 
          />
        </div>
        {/* Arabic Header (Right) */}
        <div className="w-[42%] text-right font-cairo">
          <div className="text-[#8b6b21] font-black leading-tight">
            <h1 className="text-[20px] whitespace-pre-line font-black leading-none">{labels.headerAr1}</h1>
            <h2 className="text-[14px] mt-0.5 whitespace-pre-line font-black leading-tight">{labels.headerAr2}</h2>
          </div>
        </div>
      </div>
      {/* Title Bar */}
      <div className="bg-[#7da441] text-white py-1.5 px-6 flex justify-between items-center font-black rounded-sm shadow-sm print:shadow-none" style={{ backgroundColor: '#7da441', WebkitPrintColorAdjust: 'exact' }}>
        <span className="text-[13px] font-inter uppercase tracking-wide">{labels.titleEn}</span>
        <span className="text-[16px] font-cairo">{labels.titleAr}</span>
      </div>
    </div>
  );

  const SharedFooter = () => (
    <div className="w-full mt-auto shrink-0 pb-1" dir="ltr">
      <div className="grid grid-cols-4 border border-black text-[8px] mb-3 font-bold">
        {/* Stamp (Left) */}
        <div className="col-span-1 border-r border-black min-h-[90px] relative">
          <div className="bg-slate-100 p-1 text-center border-b border-black text-[7px] leading-tight font-cairo">
            <span className="block">{labels.footerStampAr}</span>
            <span className="font-inter uppercase text-[6px]">{labels.footerStampEn}</span>
          </div>
          <div className="flex items-center justify-center p-2 absolute inset-0 pt-6">
            {data.officialStamp && <img src={data.officialStamp} className="max-h-full max-w-full object-contain mix-blend-multiply" />}
          </div>
        </div>
        {/* Place */}
        <div className="col-span-1 border-r border-black">
          <div className="bg-slate-100 p-1 text-center border-b border-black text-[7px] leading-tight font-cairo">
            <span className="block">{labels.footerPlaceAr}</span>
            <span className="font-inter uppercase text-[6px]">{labels.footerPlaceEn}</span>
          </div>
          <div className="h-16 flex items-center justify-center p-2 text-center text-[10px] font-black font-cairo">
            {data.placeOfIssue}
          </div>
        </div>
        {/* Dates */}
        <div className="col-span-1 border-r border-black">
          <div className="h-1/2 border-b border-black flex flex-col">
            <div className="bg-slate-100 p-0.5 text-center border-b border-black text-[6px] leading-none font-cairo">
               {labels.footerInspectDateAr} / <span className="font-inter text-[5px] uppercase">{labels.footerInspectDateEn}</span>
            </div>
            <div className="flex-1 flex items-center justify-center text-[10px] font-black">{data.dateOfInspection}</div>
          </div>
          <div className="h-1/2 flex flex-col">
            <div className="bg-slate-100 p-0.5 text-center border-b border-black text-[6px] leading-none font-cairo">
               {labels.footerIssueDateAr} / <span className="font-inter text-[5px] uppercase">{labels.footerIssueDateEn}</span>
            </div>
            <div className="flex-1 flex items-center justify-center text-[10px] font-black">{data.dateOfIssue}</div>
          </div>
        </div>
        {/* Officer (Right) */}
        <div className="col-span-1 relative">
          <div className="bg-slate-100 p-1 text-center border-b border-black text-[7px] leading-tight font-cairo">
            <span className="block">{labels.footerOfficerAr}</span>
            <span className="font-inter uppercase text-[6px]">{labels.footerOfficerEn}</span>
          </div>
          <div className="h-16 flex flex-col items-center justify-center p-2 text-center font-black font-cairo text-[10px] relative">
            {data.officerSignature && <img src={data.officerSignature} className="absolute inset-0 m-auto max-h-[70%] opacity-80 mix-blend-multiply" />}
            <span className="mt-auto relative z-10">{data.officerName}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end gap-4 px-1">
        {/* QR Section (Left) */}
        <div className="flex gap-3 items-center w-[45%]">
          <div className="p-1.5 bg-white border border-slate-200 shrink-0">
            <QRCodeSVG value={qrValue} size={75} level="H" />
          </div>
          <div className="text-[8.5px] font-black text-slate-800 leading-tight">
            <span className="whitespace-pre-line text-right block font-cairo">{labels.verificationNoticeAr}</span>
            <div className="font-inter font-normal text-[7px] mt-0.5 opacity-70 whitespace-pre-line text-left" dir="ltr">{labels.verificationNoticeEn}</div>
          </div>
        </div>
        {/* Disclaimer Section (Right) */}
        <div className="text-right flex-1 flex flex-col items-end">
          <p className="text-[8px] font-bold text-slate-600 mb-1 leading-tight max-w-[350px] font-cairo">
            {labels.disclaimerAr}
            <div className="font-inter font-normal text-[6.5px] mt-0.5 opacity-70 leading-none text-right" dir="ltr">{labels.disclaimerEn}</div>
          </p>
          <div className="text-[#be8b3e] text-right">
             <div className="text-[14px] font-black font-cairo leading-tight">{labels.approvedNoticeAr}</div>
             <div className="text-[9px] uppercase font-black font-inter tracking-tighter leading-none">{labels.approvedNoticeEn}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 items-center bg-slate-200 py-8 no-print" dir="ltr">
      {/* Page 1 */}
      <div className="bg-white w-[210mm] h-[297mm] px-10 py-8 flex flex-col certificate-page relative overflow-hidden print:p-8">
        <PageHeader />
        
        <div className="flex justify-between font-black text-[12px] mb-2 font-inter">
          <div>{labels.certNoLabelEn} <span className="ml-2">{data.certNo}</span></div>
          <div className="font-cairo text-[11px]"><span className="mr-2 font-inter text-[12px]">{data.verificationCode}</span> {labels.verificationCodeLabelAr}</div>
        </div>

        <div className="grid grid-cols-2 border border-black mb-3">
          <div className="border-r border-black">
            <div className="bg-slate-100 p-1 text-center font-black border-b border-black text-[9px] leading-tight font-cairo">
              <span className="block">{labels.fromLabelAr}</span>
              <span className="font-inter uppercase text-[7px]">{labels.fromLabelEn}</span>
            </div>
            <div className="p-2 text-center text-[14px] font-black uppercase font-inter leading-tight">{data.fromOrg}</div>
          </div>
          <div>
            <div className="bg-slate-100 p-1 text-center font-black border-b border-black text-[9px] leading-tight font-cairo">
              <span className="block">{labels.toLabelAr}</span>
              <span className="font-inter uppercase text-[7px]">{labels.toLabelEn}</span>
            </div>
            <div className="p-2 text-center text-[14px] font-black uppercase font-inter leading-tight">{data.toOrg}</div>
          </div>
        </div>

        <div className="bg-slate-600 text-white py-1 px-6 flex justify-between font-black mb-0 text-[12px] print:bg-slate-600" style={{ backgroundColor: '#4b5563', WebkitPrintColorAdjust: 'exact' }}>
          <span className="uppercase font-inter">{labels.consignmentTitleEn}</span>
          <span className="font-cairo text-[13px]">{labels.consignmentTitleAr}</span>
        </div>

        <div className="border border-black mb-3 text-[10px]">
          <div className="grid grid-cols-2 border-b border-black bg-slate-100 font-black text-center text-[11px]">
            <div className="border-r border-black p-1 font-cairo">
                <span className="block">{labels.exporterLabelAr}</span>
                <span className="text-[7px] font-inter uppercase">{labels.exporterLabelEn}</span>
            </div>
            <div className="p-1 font-cairo">
                <span className="block">{labels.importerLabelAr}</span>
                <span className="text-[7px] font-inter uppercase">{labels.importerLabelEn}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 min-h-[100px] text-center font-black items-center text-[13px]">
            <div className="border-r border-black p-3 whitespace-pre-wrap font-inter uppercase leading-tight">{data.exporterNameAddress}</div>
            <div className="p-3 whitespace-pre-wrap font-cairo leading-tight">{data.importerNameAddress}</div>
          </div>
          <div className="grid grid-cols-5 bg-slate-100 border-t border-black text-center font-black text-[7.5px] leading-tight min-h-[35px] font-cairo">
            <div className="border-r border-black p-1 flex flex-col justify-center"><span>{labels.purposeLabelAr}</span><span className="font-inter uppercase text-[6px]">{labels.purposeLabelEn}</span></div>
            <div className="border-r border-black p-1 flex flex-col justify-center"><span>{labels.conveyanceLabelAr}</span><span className="font-inter uppercase text-[6px]">{labels.conveyanceLabelEn}</span></div>
            <div className="border-r border-black p-1 flex flex-col justify-center"><span>{labels.permitLabelAr}</span><span className="font-inter uppercase text-[6px]">{labels.permitLabelEn}</span></div>
            <div className="border-r border-black p-1 flex flex-col justify-center"><span>{labels.totalQtyLabelAr}</span><span className="font-inter uppercase text-[6px]">{labels.totalQtyLabelEn}</span></div>
            <div className="p-1 flex flex-col justify-center"><span>{labels.totalPkgLabelAr}</span><span className="font-inter uppercase text-[6px]">{labels.totalPkgLabelEn}</span></div>
          </div>
          <div className="grid grid-cols-5 border-t border-black text-center font-black items-center min-h-[45px] text-[13px] uppercase font-inter">
            <div className="border-r border-black p-1.5">{data.endUsePurpose}</div>
            <div className="border-r border-black p-1.5">{data.meansOfConveyance}</div>
            <div className="border-r border-black p-1.5">{data.importPermitNo}</div>
            <div className="border-r border-black p-1.5">{data.totalQuantity}</div>
            <div className="p-1.5">{data.totalNoOfPackages}</div>
          </div>
        </div>

        <div className="text-[9.5px] font-medium leading-tight px-1 border-t border-white pt-1">
           <p className="font-cairo mb-1 font-bold text-right" dir="rtl">{labels.legalProseAr}</p>
           <p className="font-inter text-[8px] font-normal leading-[1.1] opacity-90 text-left" dir="ltr">{labels.legalProseEn}</p>
        </div>

        <div className="bg-slate-600 text-white py-1 px-6 flex justify-between font-black mt-3 mb-0 text-[12px] print:bg-slate-600" style={{ backgroundColor: '#4b5563', WebkitPrintColorAdjust: 'exact' }}>
          <span className="uppercase font-inter">{labels.additionalDeclarationTitleEn}</span>
          <span className="font-cairo text-[13px]">{labels.additionalDeclarationTitleAr}</span>
        </div>
        <div className="border border-black p-3 min-h-[50px] flex items-center justify-center font-black text-[15px] uppercase font-inter">
          {data.additionalDeclaration}
        </div>

        <SharedFooter />
      </div>

      {/* Page 2 - Treatment */}
      <div className="bg-white w-[210mm] h-[297mm] px-10 py-8 flex flex-col certificate-page relative overflow-hidden print:p-8">
        <PageHeader />
        <div className="bg-slate-600 text-white py-1 px-6 flex justify-between font-black mt-2 mb-0 text-[12px] print:bg-slate-600" style={{ backgroundColor: '#4b5563', WebkitPrintColorAdjust: 'exact' }}>
          <span className="uppercase font-inter">{labels.treatmentTitleEn}</span>
          <span className="font-cairo text-[13px]">{labels.treatmentTitleAr}</span>
        </div>
        <div className="border border-black mb-auto">
          <div className="grid grid-cols-5 bg-slate-100 text-center font-black border-b border-black min-h-[50px] text-[8px] leading-tight font-cairo">
             <div className="border-r border-black p-1.5 flex flex-col justify-center"><span>{labels.treatChemLabelAr}</span><span className="font-inter uppercase text-[6px]">{labels.treatChemLabelEn}</span></div>
             <div className="border-r border-black p-1.5 flex flex-col justify-center"><span>{labels.treatDurLabelAr}</span><span className="font-inter uppercase text-[6px]">{labels.treatDurLabelEn}</span></div>
             <div className="border-r border-black p-1.5 flex flex-col justify-center"><span>{labels.treatDateLabelAr}</span><span className="font-inter uppercase text-[6px]">{labels.treatDateLabelEn}</span></div>
             <div className="border-r border-black p-1.5 flex flex-col justify-center"><span>{labels.treatTypeLabelAr}</span><span className="font-inter uppercase text-[6px]">{labels.treatTypeLabelEn}</span></div>
             <div className="p-1.5 flex flex-col justify-center"><span>{labels.treatConcLabelAr}</span><span className="font-inter uppercase text-[6px]">{labels.treatConcLabelEn}</span></div>
          </div>
          <div className="grid grid-cols-5 text-center min-h-[90px] items-center text-[14px] font-black uppercase font-inter">
             <div className="border-r border-black p-2">{data.disinfestation.chemicals}</div>
             <div className="border-r border-black p-2">{data.disinfestation.durationTemp}</div>
             <div className="border-r border-black p-2">{data.disinfestation.treatmentDate}</div>
             <div className="border-r border-black p-2">{data.disinfestation.treatment}</div>
             <div className="p-2">{data.disinfestation.concentrationRate}</div>
          </div>
          <div className="grid grid-cols-[1.5fr_3.5fr] border-t border-black min-h-[70px]">
             <div className="bg-slate-100 p-2 border-r border-black flex flex-col items-center justify-center font-black">
                <span className="text-[13px] font-cairo leading-tight">{labels.treatInfoLabelAr}</span>
                <span className="text-[8px] font-inter uppercase">{labels.treatInfoLabelEn}</span>
             </div>
             <div className="p-3 flex items-center font-black text-[15px] uppercase font-inter leading-relaxed">{data.disinfestation.additionalInfo}</div>
          </div>
        </div>
        <SharedFooter />
      </div>

      {/* Page 3 - Items */}
      <div className="bg-white w-[210mm] h-[297mm] px-10 py-8 flex flex-col certificate-page relative overflow-hidden print:p-8">
        <PageHeader />
        <div className="flex justify-between items-center mb-3 border-b border-black pb-2">
           <div className="text-[14px] font-black font-inter uppercase">{labels.annexTitleEn} : <span className="text-[#be8b3e] ml-2 font-inter font-black">{data.certNo}</span></div>
           <div className="text-[16px] font-black font-cairo">{labels.annexTitleAr}</div>
        </div>
        <div className="flex-1 overflow-hidden">
          <table className="w-full border-collapse border border-black text-center font-black">
            <thead className="bg-slate-100 text-[8px] leading-tight font-cairo">
              <tr>
                <th className="border border-black p-1 w-[20%] font-bold"><span>{labels.itemScientificLabelAr}</span><br/><span className="font-inter uppercase text-[6px]">{labels.itemScientificLabelEn}</span></th>
                <th className="border border-black p-1 w-[18%] font-bold"><span>{labels.itemCommonLabelAr}</span><br/><span className="font-inter uppercase text-[6px]">{labels.itemCommonLabelEn}</span></th>
                <th className="border border-black p-1 w-[10%] font-bold"><span>{labels.itemOriginLabelAr}</span><br/><span className="font-inter uppercase text-[6px]">{labels.itemOriginLabelEn}</span></th>
                <th className="border border-black p-1 w-[22%] font-bold"><span>{labels.itemPcLabelAr}</span><br/><span className="font-inter uppercase text-[6px]">{labels.itemPcLabelEn}</span></th>
                <th className="border border-black p-1 w-[10%] font-bold"><span>{labels.itemQtyLabelAr}</span><br/><span className="font-inter uppercase text-[6px]">{labels.itemQtyLabelEn}</span></th>
                <th className="border border-black p-1 w-[10%] font-bold"><span>{labels.itemPkgLabelAr}</span><br/><span className="font-inter uppercase text-[6px]">{labels.itemPkgLabelEn}</span></th>
                <th className="border border-black p-1 w-[10%] font-bold"><span>{labels.itemClassLabelAr}</span><br/><span className="font-inter uppercase text-[6px]">{labels.itemClassLabelEn}</span></th>
              </tr>
            </thead>
            <tbody className="text-[11px] uppercase font-inter">
              {data.items.map(item => (
                <tr key={item.id} className="h-[55px]">
                  <td className="border border-black p-1 italic font-black text-[12px] leading-tight">{item.scientificName}</td>
                  <td className="border border-black p-1 font-cairo text-[10px] leading-tight">{item.commonName}</td>
                  <td className="border border-black p-1 text-[10px]">{item.origin}</td>
                  <td className="border border-black p-1 text-[9px] leading-tight break-all font-inter">{item.pcNo}</td>
                  <td className="border border-black p-1 text-[10px]">{item.quantity}</td>
                  <td className="border border-black p-1 text-[10px]">{item.noOfPackages}</td>
                  <td className="border border-black p-1 font-cairo text-[9px] leading-tight">{item.commodityClass}</td>
                </tr>
              ))}
              {Array.from({ length: Math.max(0, 14 - data.items.length) }).map((_, i) => (
                <tr key={`filler-${i}`} className="h-[55px]"><td className="border border-black" colSpan={7}></td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <SharedFooter />
      </div>

      <style>{`
        .certificate-page { font-family: 'Inter', sans-serif; }
        .font-cairo { font-family: 'Cairo', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        @media print {
            .certificate-page {
                box-shadow: none !important;
                border: none !important;
                margin: 0 !important;
                width: 210mm !important;
                height: 297mm !important;
                page-break-after: always !important;
            }
        }
      `}</style>
    </div>
  );
};

export default CertificatePreview;
