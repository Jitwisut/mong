"use client";

import { FormEvent, useState } from "react";
import { Icon } from "./icons";

export function ContactForm() {
  const [inquiryType, setInquiryType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !inquiryType || !message) {
      setSubmitted(false);
      setError("กรุณากรอกข้อมูลให้ครบทุกช่องก่อนส่งข้อความ");
      return;
    }

    setError("");
    setSubmitted(true);
    event.currentTarget.reset();
    setInquiryType("");
  };

  return (
    <section className="lg:col-span-7 bg-surface-container-lowest p-stack-lg border border-outline-variant animate-fade-in opacity-0 delay-100">
      <h2 className="font-headline-lg text-headline-lg text-on-background mb-stack-lg border-b border-outline-variant pb-stack-sm">ติดต่อทีมงาน</h2>
      <form className="space-y-stack-lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="relative group">
            <label className="font-label-caps text-label-caps text-on-surface-variant absolute -top-4 left-0 transition-all group-focus-within:text-primary" htmlFor="contact-name">ชื่อ</label>
            <input required className="input-minimal w-full font-body-md text-body-md text-on-background mt-2 focus:ring-0" id="contact-name" name="name" placeholder="เช่น คุณกมล" type="text" />
          </div>
          <div className="relative group">
            <label className="font-label-caps text-label-caps text-on-surface-variant absolute -top-4 left-0 transition-all group-focus-within:text-primary" htmlFor="contact-email">อีเมล</label>
            <input required className="input-minimal w-full font-body-md text-body-md text-on-background mt-2 focus:ring-0" id="contact-email" name="email" placeholder="เช่น hello@example.com" type="email" />
          </div>
        </div>

        <div className="relative group mt-stack-lg">
          <label className="font-label-caps text-label-caps text-on-surface-variant absolute -top-4 left-0 transition-all group-focus-within:text-primary" htmlFor="inquiry-type">หัวข้อที่ต้องการติดต่อ</label>
          <select
            className={`input-minimal w-full font-body-md text-body-md mt-2 focus:ring-0 appearance-none bg-transparent pb-2 ${inquiryType ? "text-on-background" : "text-on-surface-variant"}`}
            id="inquiry-type"
            name="inquiry"
            value={inquiryType}
            onChange={(event) => setInquiryType(event.target.value)}
          >
            <option disabled value="">เลือกหัวข้อ</option>
            <option value="buy">สอบถามการซื้อ</option>
            <option value="sell">ต้องการขาย/ฝากขาย</option>
            <option value="appraisal">ขอประเมินราคา</option>
            <option value="visit">นัดหมายเข้าชมร้าน</option>
            <option value="general">สอบถามทั่วไป</option>
          </select>
          <div className="absolute right-0 bottom-2 pointer-events-none text-outline"><Icon name="chevron-down" size={16} /></div>
        </div>

        <div className="relative group mt-stack-lg">
          <label className="font-label-caps text-label-caps text-on-surface-variant absolute -top-4 left-0 transition-all group-focus-within:text-primary" htmlFor="contact-message">ข้อความ</label>
          <textarea required className="input-minimal w-full font-body-md text-body-md text-on-background mt-2 focus:ring-0 resize-none" id="contact-message" name="message" placeholder="ระบุรุ่นหรือรายละเอียดที่ต้องการสอบถาม" rows={4} />
        </div>

        {error ? <p className="font-body-md text-sm text-error" role="alert">{error}</p> : null}
        {submitted ? (
          <p className="flex items-center gap-2 font-body-md text-sm text-primary" role="status"><Icon name="check" size={18} /> ส่งข้อความเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด</p>
        ) : null}
        <button className="mt-stack-lg px-8 py-4 bg-on-background text-on-primary font-label-caps text-label-caps tracking-widest hover:bg-primary-container hover:text-on-primary-container transition-colors duration-300 rounded-none w-full md:w-auto inline-flex items-center justify-center gap-2" type="submit">
          ส่งข้อความ <Icon name="send" size={16} />
        </button>
      </form>
    </section>
  );
}
