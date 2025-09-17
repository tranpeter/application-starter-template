# 📄 Product Requirements Document (PRD)
**Product Name (Working Title):** MediDent Inventory Manager  
**Prepared By:** Project Management  
**Date:** September 2025  

---

## 1. 🎯 Executive Summary  
Dental and medical practices often struggle with manual inventory tracking, lost supplies, and poor traceability of lot/expiry-sensitive items. Current solutions (Sowingo, ZenSupplies, Torch Dental, Hybrent) are either too expensive, too complex, or don’t balance **speed for everyday supplies** with **compliance for regulated items**.  

MediDent Inventory Manager will provide a **web + mobile platform** that:  
- **Basic Tier ($49–$79/mo):** Affordable, simple — supports **manual edits + invoice scanning**, plus low-stock & expiry alerts.  
- **Pro Tier ($149–$179/mo):** Advanced, compliant — adds a **hybrid QR code system**: permanent QR codes for everyday supplies and lot-specific QR codes for regulated items, plus batch scanning, audit trails, and analytics.  

This dual-tier approach balances accessibility for small offices and compliance needs for larger practices or those handling sensitive inventory.  

---

## 2. 🧑‍⚕️ Target Users  
- **Office Manager** → Oversees invoices, approves orders, monitors alerts.  
- **Dental/Medical Assistant** → Updates stock, scans invoices, scans QR codes at usage.  
- **Doctor/Owner (Admin)** → Needs compliance visibility, cost tracking, and accountability.  

---

## 3. 📌 Problems to Solve  
1. Manual data entry is slow and error-prone.  
2. Invoices aren’t digitized → inventory updates delayed.  
3. No reliable expiry/lot tracking → waste and compliance risk.  
4. Current systems are too expensive for small offices.  
5. Staff waste time searching lists to adjust stock for everyday supplies.  

---

## 4. 💡 Product Vision  
Provide a **mobile-first inventory system** that:  
- Uses **invoice scanning** to minimize data entry.  
- Uses **QR codes smartly**:  
  - Permanent per-item QR for everyday supplies.  
  - Lot/expiry-specific QR for compliance items.  
- Alerts staff before shortages or expiries.  
- Provides compliance-ready audit trails in the Pro version.  

---

## 5. 🛠️ Features by Tier  

### **Basic ($49–$79/mo)**  
- Manual inventory edits (add/remove quantities).  
- Invoice scanning (OCR → items + quantities).  
- Low-stock alerts (push/email).  
- Manual expiry entry + alerts.  
- CSV import/export for setup & reconciliation.  
- Notes/comments on updates.  
- Unlimited users with simple roles (Assistant, Manager, Admin).  
- Basic audit logs (manual + invoice updates only).  

### **Pro ($149–$179/mo)**  
Includes all Basic features **plus**:  
- **Hybrid QR System:**  
  - Permanent per-item QR codes for everyday supplies (gloves, gauze, etc.).  
  - Lot-specific QR codes for compliance items (implants, anesthetics, meds).  
- QR-based scan-in/out for all items (fast checkout and restock).  
- Lot & expiry tracking (FIFO usage recommendations).  
- Batch scanning (scan multiple items in one workflow).  
- Label generation & printing for lots and new items.  
- Expiry dashboards & waste analytics.  
- Structured removal reasons (use, waste, expired).  
- Detailed audit logs (items, lots, expiry, scan method, reason).  

---

## 6. 🚀 Roadmap (Week-by-Week)  

**Weeks 1–2 → Planning & Setup**  
- Wireframes, data models, cloud setup, CI/CD.  

**Weeks 3–4 → Core Inventory Database + APIs**  
- Schema design, REST APIs, basic web dashboard.  

**Weeks 5–6 → Manual Inventory Edits + CSV Import/Export**  
- CRUD operations, CSV pipeline, audit logs.  

**Weeks 7–8 → Invoice Scanning (OCR)**  
- OCR engine integration, invoice parsing, review & confirm, invoice archive.  

**Weeks 9–10 → Alerts & Notifications**  
- Low-stock alerts, manual expiry alerts, push/email via AWS SNS.  

**Weeks 11–12 → Mobile App Core (Basic MVP Launch)**  
- React Native app, login/auth, manual edits, invoice scanning.  

**Weeks 13–14 → Pro Features: Hybrid QR System**  
- Permanent item QR, lot-specific QR, label printing.  

**Weeks 15–16 → Pro Features: Scan Workflows**  
- Scan-in/out workflows, audit logging.  

**Weeks 17–18 → Pro Features: Batch Scanning & Audit**  
- Batch scan mode, grouping, detailed audit logs.  

**Weeks 19–20 → Reporting & Analytics**  
- Expiry dashboard, waste analytics, usage trends.  

**Weeks 21–22 → QA & Pilot Testing**  
- Unit tests, pilot clinics, bug fixes.  

**Week 23 → Basic Launch**  
- Public launch of Basic tier.  

**Weeks 24–26 → Pro Launch**  
- Roll out Pro features + dashboards.  

---

## 7. 📊 Success Metrics  
- Setup in **<1 day** with CSV import + invoice scanning.  
- ≥90% accuracy between invoice scans and physical stock.  
- ≥70% staff adoption of invoice scanning in month 1.  
- ≥80% of expiries flagged before waste (Pro).  
- ≥15% supply cost savings from waste reduction & better ordering.  

---

## 8. 💵 Pricing Strategy  
| Tier | Price | Features |  
|------|-------|----------|  
| **Basic** | $49–$79/mo | Manual edits, invoice scanning, low-stock & expiry alerts, CSV export |  
| **Pro** | $149–$179/mo | Invoice + hybrid QR system, scan-in/out, lot/expiry tracking, batch scanning, audit logs, analytics |  
| **Enterprise** | $349–$399/mo | Multi-practice rollup, PMS/ERP integrations, vendor marketplace, advanced analytics |  

---

## 9. 🏗️ Technical Environment  
- **Frontend:** React (Web), React Native (Mobile).
- **React Component Library:** Mantine v8.3.0+ TanStack Table.
- **Backend:** Node.js + Express, PostgreSQL.
- **Database:** PostgreSQL (Azure Database for PostgreSQL).  
- **Authentication:** Azure AD B2B + JWT.  
- **API:** REST API, GraphQL.  
- **Containerization:** Docker + Kubernetes.
- **CI/CD:** GitHub Actions.
- **Logging:** Azure Monitor.  
- **Monitoring:** Azure Monitor.  
- **Backup:** Azure Backup.  
- **Security:** HIPAA-ready → TLS encryption, RBAC, audit logs, encrypted at rest.  

---

## 10. 🔮 Risks & Mitigations  
- **OCR accuracy issues** → Implement human review step for low-confidence scans.  
- **Invoice format variability** → ML training on common vendor invoices.  
- **Adoption friction** → Provide Basic tier with low setup cost; optional white-glove onboarding.  
- **Support burden** → In-app guides + chatbot for invoice scan troubleshooting.  

---

✅ With this design:  
- **Basic** is attractive to small offices (manual + invoice scan + alerts).  
- **Pro** provides speed & compliance with **hybrid QR scanning** that works for both everyday supplies **and** lot-tracked items.  
