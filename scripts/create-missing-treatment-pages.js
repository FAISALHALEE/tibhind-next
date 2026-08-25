const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(process.cwd(), "data", "pages");
const TEMPLATE = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "treatments-eye-surgery.json"), "utf8"),
);

const NAV = TEMPLATE.body.slice(0, TEMPLATE.body.indexOf("</header>") + "</header>".length);
const FOOTER = TEMPLATE.body.slice(TEMPLATE.body.indexOf('<footer class="foot">'));

const routes = new Set([
  "/sitemap.xml",
  ...fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), "utf8")).route),
]);

const TODAY = "2026-08-24";
const MONTH = "August 2026";

const SPECIALTIES = [
  {
    slug: "paediatric-surgery",
    name: "Paediatric surgery",
    h1: "Paediatric surgery in India",
    lede: "Hernia and undescended testis repair in infants, hypospadias, anorectal malformations and Hirschsprung disease, at hospitals used to treating children rather than small adults.",
    insight:
      "Children are not small adults. Anaesthesia, dosing, ward environment and even the way a history is taken all differ — which is why the surgeon and the hospital both need specific paediatric experience, not only good adult outcomes.",
    emergency:
      "A newborn who does not pass meconium within 48 hours, bilious vomiting, or a groin swelling in an infant that becomes hard, red and irreducible needs surgical assessment today.",
    readFirstTitle: "Timing matters as much as technique",
    readFirstBody:
      "Parents often arrive having been told their child needs an operation urgently, when in truth most paediatric surgery is planned around a correct age window — and some conditions that look surgical resolve entirely on their own.",
    readFirstPoints: [
      [
        "Some conditions need no operation",
        "Physiological phimosis and many umbilical hernias in infants close by themselves. A surgeon who operates on everything is not the right surgeon.",
      ],
      [
        "Every condition has a window",
        "Undescended testes, hypospadias and hernias each have an ideal age range for repair — early enough to prevent harm, late enough to be safe.",
      ],
      [
        "Ask about volumes",
        "Paediatric anaesthesia and paediatric ward care are what make children's surgery safe. Ask how many children the unit treats each year.",
      ],
    ],
    keyfacts: [
      ["Common operations", "Day case", "Most hernia and undescended testis repairs go home the same day"],
      ["Age matters", "Timing varies", "Some repairs are best early; watchful waiting is right for others"],
      ["Anaesthesia", "Paediatric team", "The anaesthetist matters as much as the surgeon"],
      ["Attendants", "One parent stays", "Wards expect a carer at the bedside throughout"],
    ],
    conditions: [
      ["Inguinal and umbilical hernia", "Common in infants, and repair is straightforward when done electively"],
      ["Undescended testes", "Best corrected within the first year of life"],
      ["Hypospadias", "Reconstruction usually planned between 6 and 18 months"],
      ["Anorectal malformations", "Staged reconstruction starting in the newborn period"],
      ["Hirschsprung disease", "Presents as delayed meconium or chronic constipation"],
      ["Phimosis and foreskin problems", "Many resolve without operation; surgery when genuinely needed"],
      ["Paediatric urology", "Antenatally detected hydronephrosis and recurrent urinary infections"],
      ["Lumps, sinuses and cysts", "Neck sinuses, cystic hygroma and other congenital lumps"],
    ],
    proceduresIntro:
      "Children usually recover faster than adults from the same operation, and most paediatric procedures are planned day cases.",
    clauses: [
      ["Dedicated paediatric theatre lists", "Ask whether children are operated on dedicated paediatric lists or scattered through adult lists."],
      ["Paediatric anaesthesia cover", "A paediatric-trained anaesthetist and a paediatric ICU or HDU bed for neonatal work."],
      ["Parent accommodation", "One parent stays on the ward. Ask how this is arranged before you travel."],
    ],
    risksProse:
      "Elective paediatric surgery has low complication rates, but the risks are specific: anaesthetic care in small infants, wound infection, and recurrence in hernia repair. Neonatal surgery for anorectal malformations or Hirschsprung disease is staged and needs planned follow-up, sometimes across more than one trip.",
    dontTravel: [
      ["Bilious vomiting in a newborn", "Possible obstruction. This is an emergency where you are — do not fly."],
      ["Strangulated groin hernia signs", "Hard, painful, red and irreducible swelling needs surgery today."],
      ["Fever with uncontrolled symptoms", "Infection should be treated before travelling for elective surgery."],
    ],
    tripScenario: "A one-year-old travelling for hypospadias repair.",
    tripSteps: [
      ["Send your reports — day one", "Photographs, any urology assessments, and the child's growth records."],
      ["Written opinion — within 48 hours", "Whether repair is advised now, the planned technique, and a cost range."],
      ["Visa and travel — one to two weeks", "Medical visa letters covering the child and one or two attendants."],
      ["Assessment — day one", "Examination, bloods, and anaesthetic review."],
      ["Surgery — day two", "Most repairs are day case or one night in hospital."],
      ["Aftercare — three to five days", "Wound review and written instructions before flying home."],
    ],
    faqs: [
      ["What is the right age for repair?", "It depends on the problem. Undescended testes are best treated around six to twelve months; hypospadias between six and eighteen months; many inguinal hernias whenever they are diagnosed. Some conditions, like physiological phimosis, need no operation at all."],
      ["Can a parent stay overnight?", "Yes, one parent stays with the child on the ward throughout, and this is expected rather than merely permitted. Tell us your family situation so we arrange rooms accordingly."],
      ["Is general anaesthesia safe at this age?", "Modern paediatric anaesthesia is very safe when given by trained paediatric anaesthetists in units doing these operations regularly. This is exactly what we check before recommending a hospital."],
      ["Will my child need more than one operation?", "For hernia, undescended testes and most hypospadias, one operation is usual. Anorectal malformations and some Hirschsprung cases are staged and need more than one admission."],
    ],
  },
  {
    slug: "nephrology",
    name: "Nephrology",
    h1: "Kidney treatment in India",
    lede: "Chronic kidney disease staging, dialysis access surgery, glomerular disease work-up and transplant preparation, coordinated with the same teams who perform kidney transplants here.",
    insight:
      "The single most useful thing a kidney patient can send us is not one report but a series — creatinine over time, urine protein, and blood pressure readings. Kidney decisions are about trajectory, not a single value.",
    emergency:
      "No urine output, breathlessness from fluid overload, chest pain, or confusion in a known kidney patient needs emergency dialysis assessment now — travel can wait until you are stable.",
    readFirstTitle: "Kidney decisions follow trajectories, not single results",
    readFirstBody:
      "Patients often arrive with one creatinine value and one ultrasound. What actually determines treatment is the trend over months, how much protein the kidneys leak, and blood pressure control across that same period.",
    readFirstPoints: [
      [
        "Bring the series, not a snapshot",
        "Creatinine and urine protein trends over six to twelve months tell a nephrologist more than any single admission panel.",
      ],
      [
        "Access before dialysis",
        "A fistula needs weeks to mature. Created early, it avoids emergency catheters and their infections entirely.",
      ],
      [
        "Transplant workup starts at home",
        "Donor and recipient testing can largely happen before you fly, which shortens your trip in India by weeks.",
      ],
    ],
    keyfacts: [
      ["Trajectory beats values", "Send series", "Creatinine trend over months guides decisions better than one result"],
      ["Dialysis access", "Plan ahead", "A fistula takes weeks to mature — never leave it to the last moment"],
      ["Transplant workup", "Starts at home", "Donor and recipient testing begins before anyone books flights"],
      ["Diet and pressure", "The real treatment", "Blood pressure and protein control slow every form of CKD"],
    ],
    conditions: [
      ["Chronic kidney disease", "Staging, progression risk and planning well before dialysis is needed"],
      ["Diabetic kidney disease", "The commonest cause worldwide, and the most preventable"],
      ["Glomerulonephritis", "Including IgA nephropathy and nephrotic syndrome, with biopsy-led treatment"],
      ["Polycystic kidney disease", "Family screening, blood pressure control and transplant planning"],
      ["Dialysis access", "Fistula and graft surgery, and peritoneal dialysis catheters"],
      ["Transplant workup", "Recipient and donor assessment, immunology and paperwork"],
    ],
    proceduresIntro:
      "Nephrology is mostly physician-led medicine. The surgical parts — access creation and transplantation — are where timing and unit choice matter most.",
    clauses: [
      ["Biopsy on site", "A renal biopsy service with a reporting pathologist changes treatment in inflammatory disease."],
      ["Access-first planning", "Units that create fistulas early avoid emergency catheters and their infections."],
      ["Joined-up transplant pathway", "The nephrologists assessing you should work with the transplant surgeons directly."],
    ],
    risksProse:
      "Kidney biopsy carries a small bleeding risk. Fistula surgery can fail to mature and may need revision. Dialysis while travelling requires pre-arranged sessions. Transplant carries the risks of major surgery plus lifelong immunosuppression — rejection, infection and medication side-effects — and needs honest lifelong follow-up planning after you return home.",
    dontTravel: [
      ["Fluid overload or no urine output", "Potassium and fluid emergencies kill before any flight helps."],
      ["Uncontrolled blood pressure", "Travel and surgery on top of severe hypertension is how strokes happen."],
      ["Active infection", "Peritonitis on peritoneal dialysis or an infected access must be treated first."],
    ],
    tripScenario: "A patient with progressive CKD preparing for a living-donor transplant.",
    tripSteps: [
      ["Send your reports — day one", "Creatinine trend, urine protein, ultrasound, and donor details if you have one."],
      ["Written opinion — within 48 hours", "Where you stand on the pathway: medicine, dialysis planning, or transplant workup."],
      ["Workup at home — weeks, not days", "Much donor and recipient testing happens before you fly, saving trip time."],
      ["Assessment in India — about a week", "Immunology, cardiac clearance and final matching."],
      ["Transplant and recovery — two to four weeks", "Longer than most trips, because immunosuppression starts here."],
      ["Follow-up plan", "Drug levels and monitoring arranged with your own doctor at home."],
    ],
    relatedLinks: [
      ["/conditions/diabetic-kidney-disease/", "Diabetic kidney disease"],
      ["/conditions/end-stage-kidney-disease/", "End-stage kidney disease"],
      ["/treatments/transplant/", "Organ transplant programme"],
      ["/cost/transplant/", "Transplant cost guide"],
    ],
    faqs: [
      ["Can I travel on dialysis?", "Yes, with pre-arranged sessions at a unit in India, or by timing your trip around transplant workup instead. We arrange dialysis schedules as part of the trip plan."],
      ["When should a fistula be created?", "Months before dialysis is likely to start — a fistula needs weeks to mature, and emergency catheters carry far higher infection rates. If your kidney function is falling steadily, ask now."],
      ["Does a relative have to be the donor?", "Living donors are usually relatives, but unrelated and swap programmes exist under Indian law. The authorisation committee process is part of our transplant guidance."],
      ["What slows kidney disease down?", "Blood pressure control, diabetes control, the right BP tablets even at normal pressures, and avoiding painkillers like ibuprofen. These do more than any supplement sold online."],
    ],
  },
  {
    slug: "endocrinology",
    name: "Endocrinology",
    h1: "Diabetes and hormone care in India",
    lede: "Diabetes control, thyroid disease, PCOS, obesity medicine and pituitary or adrenal assessment, with the laboratory follow-up that makes hormone treatment actually work.",
    insight:
      "Endocrinology fails without follow-up. A dose adjusted in India means nothing unless someone checks the response eight weeks later — so we build the lab schedule into every plan before you fly home.",
    emergency:
      "Vomiting with high sugars, deep rapid breathing or confusion can be diabetic ketoacidosis. Severe hypoglycaemia that does not respond to sugar needs emergency care now.",
    readFirstTitle: "Hormone treatment only works with follow-up",
    readFirstBody:
      "Endocrinology is the specialty most ruined by one-off consultations. A thyroid dose or insulin regimen set in India needs a scheduled recheck — so every plan we build carries a lab calendar you can follow from home.",
    readFirstPoints: [
      [
        "Trends drive dosing",
        "HbA1c every three months while adjusting, TSH six weeks after any levothyroxine change. Single readings mislead.",
      ],
      [
        "Fix sugars before other surgery",
        "Across every specialty, good glucose control before an operation lowers infection and healing complications.",
      ],
      [
        "Thyroid nodules are usually watched",
        "Ultrasound features decide who needs biopsy. Most nodules need neither needle nor theatre — just scheduled review.",
      ],
    ],
    keyfacts: [
      ["Follow-up", "Built into plans", "Every change gets a scheduled recheck"],
      ["Thyroid lumps", "Usually benign", "Ultrasound and, if needed, biopsy decide — not worry"],
      ["PCOS", "Lifestyle first", "Medicines support, not replace, the basics"],
      ["Obesity medicine", "Not willpower", "Modern options work when properly supervised"],
    ],
    conditions: [
      ["Type 2 diabetes", "Control, complications screening and insulin initiation when needed"],
      ["Thyroid disease", "Underactive, overactive, and assessment of thyroid nodules"],
      ["PCOS", "Cycle control, fertility planning and metabolic health"],
      ["Obesity and metabolic syndrome", "Structured programs including modern medical therapy"],
      ["Vitamin D and bone health", "Osteoporosis assessment and parathyroid problems"],
      ["Growth and puberty concerns", "Short stature, early or late puberty in children"],
      ["Adrenal and pituitary disorders", "Cushing syndrome, prolactin disorders and hypopituitarism"],
    ],
    proceduresIntro:
      "Endocrinology is investigation-and-medical care. The procedures involved — thyroid biopsy, DEXA scanning, dynamic hormone testing — are diagnostic, and their quality decides everything downstream.",
    clauses: [
      ["Laboratory standards", "Hormone assays vary wildly between labs. We use units with validated, consistent assays."],
      ["Imaging before opinions", "Thyroid ultrasound with TIRADS reporting before anyone discusses surgery."],
      ["Structured retesting", "Dynamic tests like dexamethasone suppression need proper protocol, not improvisation."],
    ],
    risksProse:
      "Most endocrine treatment risk comes from overtreatment: too much insulin causing hypos, too much thyroxine straining the heart, steroids causing weight gain and bone loss. Thyroid and pituitary surgery, where needed, carries specific risks to voice and calcium regulation that your surgeon should explain in numbers.",
    dontTravel: [
      ["Suspected ketoacidosis", "Vomiting with high sugars is an emergency where you are."],
      ["Untreated overactive thyroid with heart symptoms", "Racing heart and weight loss need stabilising before long-haul travel."],
      ["Severe hypo unawareness", "Do not travel alone until this is addressed."],
    ],
    tripScenario: "A patient with poorly controlled type 2 diabetes and a thyroid nodule.",
    tripSteps: [
      ["Send your reports — day one", "Recent HbA1c trends, current medicines, and any thyroid ultrasound."],
      ["Written opinion — within 48 hours", "What to stabilise first, which tests to bring, and what to skip."],
      ["Assessment — days one to three", "Laboratory panel, nodule assessment, complication screening."],
      ["Treatment plan — end of week one", "Medicine changes with a written titration schedule."],
      ["Remote follow-up", "Scheduled lab rechecks interpreted remotely with your local doctor."],
    ],
    relatedLinks: [
      ["/conditions/gallstones/", "Gallstones and metabolic health"],
      ["/treatments/gastroenterology/", "Liver and digestive care"],
      ["/doctors/", "Find doctors"],
    ],
    faqs: [
      ["How often should HbA1c be checked?", "Every three months while treatment is being adjusted, and every six months once stable. A single good number tells you little without the trend."],
      ["Does every thyroid nodule need biopsy?", "No. Size and ultrasound features decide. Most nodules only need periodic ultrasound, and biopsy is reserved for suspicious patterns."],
      ["I am coming for another operation. Should I fix my sugars first?", "Yes — sugar control before surgery lowers infection and healing complications across every specialty. Stabilising first often shortens the whole trip."],
      ["Are newer diabetes medicines worth it?", "For many patients with heart or kidney risk, yes — they reduce real outcomes, not just sugar numbers. Whether they suit you depends on your kidneys, heart and budget."],
    ],
  },
  {
    slug: "plastic-surgery",
    name: "Plastic and reconstructive surgery",
    h1: "Plastic and reconstructive surgery in India",
    lede: "Hand surgery, burns contracture release, cleft lip and palate, microvascular reconstruction after cancer, and complex wound coverage, from units doing high volumes of each.",
    insight:
      "Reconstruction is a sequence, not an event. A burns contracture release or a free-flap reconstruction has a planned journey — and knowing that journey before you book flights matters more than any single photograph of results.",
    emergency:
      "A completely severed finger or part, a hand crushed beyond recognition, or a burn with breathing difficulty needs emergency services immediately — microvascular replantation is against the clock.",
    readFirstTitle: "Reconstruction is a sequence, not an event",
    readFirstBody:
      "The best reconstructive outcomes come from units that plan the whole journey — stages, therapy, revisions — before the first incision. Patients who arrive with photographs and a clear history get far more useful opinions.",
    readFirstPoints: [
      [
        "Photographs do most of the work",
        "Well-lit images at rest and in movement let a surgeon judge contractures and wounds before you travel anywhere.",
      ],
      [
        "Therapy decides outcomes",
        "Hand surgery and burns release succeed or fail on months of splinting and physiotherapy after the operation.",
      ],
      [
        "Smoking and sugar control",
        "Both measurably raise flap failure and wound problems. Fixing them first is the cheapest surgery you will ever get.",
      ],
    ],
    keyfacts: [
      ["Hand injuries", "Time-sensitive", "Tendon and nerve repair outcomes fall with delay"],
      ["Burns contracture", "Staged release", "Old scars are released and grafted in planned stages"],
      ["Cleft care", "A programme", "Lip, palate and then dental-stage care over years"],
      ["Free flaps", "Microsurgery", "Needs a unit with 24-hour microscope capability"],
    ],
    conditions: [
      ["Hand and tendon injuries", "Repair, tendon transfer and nerve reconstruction"],
      ["Burns contractures", "Release and resurfacing of neck, armpit and hand contractures"],
      ["Cleft lip and palate", "Primary repair and later revision within a full cleft programme"],
      ["Post-cancer reconstruction", "Breast, head-and-neck and limb reconstruction after tumour removal"],
      ["Chronic wounds", "Pressure sores, diabetic ulcers and flap coverage"],
      ["Lymphoedema", "Physiology-first management with surgical options in selected cases"],
    ],
    proceduresIntro:
      "Reconstructive work ranges from thirty-minute scar releases to twelve-hour free flaps. What unites them is planning: imaging, staging and realistic goals agreed before theatre.",
    clauses: [
      ["Volume in your exact operation", "A great hand surgeon is not automatically a great microsurgeon. Ask about your specific procedure."],
      ["Critical-care back-up", "Free-flap patients need monitored beds and staff who check flaps at night."],
      ["Revision policy", "Reconstruction sometimes needs refinement. Agree how revisions are handled before you travel."],
    ],
    risksProse:
      "Flap and graft failure, infection, stiffness, and the need for further operations are real possibilities even in excellent hands — smoking and diabetes raise them sharply. Cleft care extends over years and involves speech and dental stages beyond the initial repair. Ask for success rates in your specific procedure.",
    dontTravel: [
      ["Acute hand ischaemia or amputation", "Go to the nearest capable unit — hours matter."],
      ["Active wound infection", "Operate through infection and grafts fail; treat first."],
      ["Uncontrolled diabetes or active smoking", "Fix these before elective reconstruction or expect worse wounds."],
    ],
    tripScenario: "An adult travelling for release of a neck burns contracture.",
    tripSteps: [
      ["Send photographs — day one", "Clear images of the contracture at rest and in movement, plus burn history."],
      ["Written opinion — within 48 hours", "Whether release is advisable, the technique, and how many stages to expect."],
      ["Visa and travel — one to two weeks", "Contracture work is usually a single-stage trip; complex reconstructions take longer."],
      ["Surgery and grafting — day one to three", "Donor sites chosen to minimise visible scarring."],
      ["Splinting and therapy — one to two weeks", "Outcome depends on therapy as much as surgery."],
      ["Home program", "Written splint and exercise schedule for the months after you fly."],
    ],
    relatedLinks: [
      ["/hospitals/", "Partner hospitals"],
      ["/best-hospitals-india/", "Hospital network"],
      ["/medical-visa/", "Medical visa guidance"],
    ],
    faqs: [
      ["Will one operation be enough?", "For many contractures and hand problems, yes. Complex burns, clefts and cancer reconstructions are often staged. Ask explicitly how many stages and what lies between them."],
      ["Do you also handle cosmetic requests?", "Our focus is reconstructive need. Cosmetic surgery exists in India at high standards, but our triage and pricing honesty are built around medically indicated care."],
      ["What decides flap success?", "Surgeon volume, unit infrastructure, your smoking status, diabetes control and how quickly problems are caught afterwards. The last one is why flap units check flaps through the night."],
      ["How soon after cancer surgery can reconstruction happen?", "Sometimes immediately, sometimes after healing and adjuvant treatment. The oncologist and reconstructive surgeon should agree the sequence before either operates."],
    ],
  },
  {
    slug: "rheumatology",
    name: "Rheumatology",
    h1: "Rheumatology care in India",
    lede: "Inflammatory arthritis, lupus, vasculitis and metabolic bone disease, diagnosed properly and treated with the modern drug ladder — biologics included, at honest prices.",
    insight:
      "Inflammatory back pain and rheumatoid arthritis respond dramatically when treated early, and poorly when treated late. The gap between a diagnosis at month two and month two years can be the difference between a normal joint and a replaced one.",
    emergency:
      "A single hot, swollen, extremely painful joint with fever is septic arthritis until proven otherwise — that is an emergency today, not a rheumatology appointment next month.",
    readFirstTitle: "Early treatment changes everything",
    readFirstBody:
      "Inflammatory arthritis and lupus cause their permanent damage in the first one to two years. Patients treated properly inside that window routinely keep normal joints; patients treated with painkillers alone often do not.",
    readFirstPoints: [
      [
        "Painkillers are not treatment",
        "Anti-inflammatories mask symptoms while the disease erodes joints. DMARD therapy changes the disease course itself.",
      ],
      [
        "Positive blood tests alone are not disease",
        "Many healthy people carry autoantibodies. Diagnosis needs the pattern — joints, skin, organs — matched to the laboratory.",
      ],
      [
        "Screening comes before strong drugs",
        "TB and hepatitis testing before biologics is mandatory practice, not bureaucracy. Any unit skipping it is cutting corners.",
      ],
    ],
    keyfacts: [
      ["Early treatment", "Changes everything", "Window-period treatment prevents permanent damage"],
      ["Diagnosis first", "Before escalation", "Biologics belong after proven inflammatory disease"],
      ["TB screening", "Before biologics", "Standard, and non-negotiable, before immune suppression"],
      ["Monitoring", "Lifelong, simple", "Blood counts and liver checks keep strong drugs safe"],
    ],
    conditions: [
      ["Rheumatoid arthritis", "Early DMARD strategy and monitoring"],
      ["Ankylosing spondylitis", "Inflammatory back pain, imaging-led diagnosis, biologic escalation"],
      ["Lupus (SLE)", "Organ-threatening disease assessed and treated by specialists"],
      ["Gout", "Tophi, flares and urate-lowering done properly"],
      ["Psoriatic arthritis", "Skin and joints treated together"],
      ["Vasculitis", "From skin-limited to organ-threatening disease"],
      ["Osteoporosis", "Fracture-risk assessment and treatment"],
    ],
    proceduresIntro:
      "Rheumatology is diagnosis plus a drug ladder: conventional DMARDs first, biologics and JAK inhibitors when they are genuinely needed. Joint injections and imaging complete the toolkit.",
    clauses: [
      ["Serology with sense", "Positive antibodies without compatible disease are not a diagnosis. Units that treat lab reports instead of patients over-treat."],
      ["Screening before escalation", "Hepatitis, TB and vaccination status checked before any biologic — always."],
      ["Affordable originator-quality care", "Biosimilars made in India are legitimate and widely used; a plan that ignores cost is a plan patients abandon."],
    ],
    risksProse:
      "Immune-suppressing treatment raises infection risk — that is why screening and monitoring exist. Long-term steroids cause bone thinning, weight gain, diabetes and cataracts; the goal is always the lowest effective dose. Pregnancy planning changes every drug choice, so tell your specialist early.",
    dontTravel: [
      ["Hot swollen joint with fever", "Septic arthritis needs drainage today."],
      ["Cough with immune suppression", "Fever on a biologic needs assessment before travel."],
      ["Uncontrolled infection anywhere", "Escalate immunosuppression only after it is treated."],
    ],
    tripScenario: "A patient with years of untreated inflammatory arthritis.",
    tripSteps: [
      ["Send your reports — day one", "Joint photographs, X-rays or MRI, previous drug trials and responses."],
      ["Written opinion — within 48 hours", "Whether the pattern fits inflammatory disease and what to start."],
      ["Assessment — days one to three", "Examination, labs, imaging and TB/hepatitis screening."],
      ["Treatment started — week one", "Conventional therapy first unless severity demands more."],
      ["Monitoring plan", "Blood-test schedule with your own doctor at home, reviewed remotely."],
    ],
    relatedLinks: [
      ["/conditions/ankylosing-spondylitis/", "Ankylosing spondylitis"],
      ["/conditions/knee-osteoarthritis/", "Knee osteoarthritis"],
      ["/treatments/orthopaedics/", "Joint replacement programme"],
    ],
    faqs: [
      ["Are Indian biosimilars safe?", "Yes — approved through the same regulatory pathway as elsewhere and used across India for years. They are typically far cheaper, which is why a treatment plan that lasts must consider them."],
      ["Why did my steroids help but cause problems?", "Steroids suppress inflammation brilliantly and damage everything else over time. Modern practice uses them as a bridge, not a destination."],
      ["Can rheumatoid arthritis go into remission?", "Many patients achieve low disease activity or remission with early, correctly escalated treatment. That is precisely why diagnosis timing matters so much."],
      ["Do I need repeated trips to India?", "No. Start and stabilise here, then continue with your local doctor under a written monitoring plan. We stay available remotely."],
    ],
  },
  {
    slug: "general-surgery",
    name: "General surgery",
    h1: "General surgery in India",
    lede: "Gallstones, hernias, appendix and laparoscopic abdominal surgery — the operations we arrange most often, from surgeons who do them every week.",
    insight:
      "Almost every general-surgery problem we see has one decision hiding inside it: operate now, operate later, or not at all. Getting that decision right — with honest imaging and an honest surgeon — matters more than anything technical that follows.",
    emergency:
      "Severe constant right-lower abdominal pain with fever, a hernia that becomes hard and cannot be pushed back, or vomiting with absolute constipation needs surgical assessment today.",
    readFirstTitle: "The hardest part is deciding whether to operate at all",
    readFirstBody:
      "Gallstones on a scan and small hernias are extremely common, and many of them should be watched rather than removed. The value of a good general surgeon lies first in honest indications, then in technique.",
    readFirstPoints: [
      [
        "Not every finding needs surgery",
        "Silent gallstones and most small asymptomatic hernias are monitored internationally. Operating on everything is a business model, not medicine.",
      ],
      [
        "Match the pain to the scan",
        "A report saying \"stones present\" does not prove they cause your pain. The pattern of symptoms matters as much as the image.",
      ],
      [
        "Volume still matters",
        "Laparoscopic gallbladder and hernia repair are standardised, but complications concentrate in units doing few of them. Ask for numbers.",
      ],
    ],
    keyfacts: [
      ["Laparoscopic first", "Default approach", "Smaller cuts, faster recovery in most elective work"],
      ["Day case", "Common", "Many hernia and gallstone operations need one night or none"],
      ["Mesh", "Standard", "Modern hernia repair uses mesh; ask which and why"],
      ["Time in India", "About a week", "Assessment, surgery and first review"],
    ],
    conditions: [
      ["Gallstones", "Symptomatic stones, and honest advice about silent ones"],
      ["Groin and umbilical hernia", "Laparoscopic or open mesh repair, planned electively"],
      ["Appendicitis", "Including the delayed presentations common after long flights"],
      ["Incisional hernia", "Complex abdominal wall reconstruction after previous surgery"],
      ["Pilonidal disease", "Definitive surgery for a recurring nuisance"],
      ["Varicose veins", "Laser and glue treatments, not just stripping"],
    ],
    proceduresIntro:
      "Laparoscopic cholecystectomy and mesh hernia repair are among the most standardised operations in existence. Volume still matters — complications concentrate in low-volume settings.",
    clauses: [
      ["Imaging that answers the question", "An ultrasound that says \"stones present\" is not the same as one that explains your pain."],
      ["Honest indication", "Silent gallstones and small asymptomatic hernias are often watched, not operated. Surgeons who operate on everything exist — we avoid them."],
      ["Day-case capability", "Units with proper day-case pathways discharge you safely sooner."],
    ],
    risksProse:
      "Gallstone surgery carries small risks of bile leak and injury to the bile duct; hernia repair carries recurrence and chronic pain risks, reduced but not abolished by mesh. Laparoscopic surgery can convert to open. Ask your surgeon for their personal conversion and complication rates — good surgeons answer precisely.",
    dontTravel: [
      ["Hard irreducible hernia", "Strangulation is an emergency where you are."],
      ["Fever with abdominal pain", "Perforation or abscess needs treatment before any flight."],
      ["Jaundice with pain and fever", "Charcot triad suggests bile duct infection — urgent, not elective."],
    ],
    tripScenario: "An adult travelling for elective gallbladder surgery.",
    tripSteps: [
      ["Send your reports — day one", "Ultrasound report, previous scans, and a description of the actual pain pattern."],
      ["Written opinion — within 48 hours", "Whether surgery is genuinely indicated, technique, and a cost range."],
      ["Visa and travel — one to two weeks", "Single-attendant trips are typical for day-case work."],
      ["Assessment — day one", "Bloods, anaesthetic review, confirmation of imaging."],
      ["Surgery — day two", "Most patients walk the same evening."],
      ["Review and fly — days four to seven", "Wound check and written post-op instructions."],
    ],
    relatedLinks: [
      ["/conditions/gallstones/", "Gallstones"],
      ["/cost/bariatric-surgery/", "Bariatric surgery costs"],
      ["/treatments/gastroenterology/", "Liver and digestive care"],
    ],
    faqs: [
      ["My gallstones cause no pain. Should they come out?", "Usually no. Surgery is for symptoms and complications. Exception: transplant candidates and a few other groups. Get the indication right and the rest follows."],
      ["Mesh sounds frightening.", "Mesh repair lowered hernia recurrence dramatically and is the international standard. Infection and chronic pain are rare; recurrence without mesh is common. Ask what mesh is proposed and why."],
      ["How long before I can fly after laparoscopic surgery?", "Typically a few days for uncomplicated gallbladder or hernia work. Flying too soon after major abdominal surgery raises specific risks — we build flight timing into the plan."],
      ["Open or laparoscopic?", "Laparoscopic wherever feasible: less pain, fewer wound infections, faster return to work. Previous operations and anatomy sometimes make open wiser — that is judgement, not downgrade."],
    ],
  },
  {
    slug: "dermatology",
    name: "Dermatology",
    h1: "Dermatology care in India",
    lede: "Psoriasis, vitiligo, eczema, hair loss and skin-cancer assessment, with biologic therapy and phototherapy programmes that continue properly after you fly home.",
    insight:
      "Skin disease is treated in months and years, not visits. The clinics that get the best results are the ones that design a maintenance plan you can actually follow from home — not the ones that dazzle you for two weeks.",
    emergency:
      "A widespread rash with blisters, skin peeling, mouth ulcers and fever can be a severe drug reaction. Stop the suspected drug and seek emergency care immediately.",
    readFirstTitle: "Skin disease is managed in years, not visits",
    readFirstBody:
      "Psoriasis, vitiligo and eczeme follow relapsing courses. The clinics with the best long-term results are those that design maintenance you can continue at home — not those that impress you for a fortnight.",
    readFirstPoints: [
      [
        "Bring the treatment history",
        "Every cream, tablet and light course you have tried — and what happened. It prevents repeating failures and identifies what was never actually tried.",
      ],
      [
        "Strong steroids need supervision",
        "Misused topical steroids thin skin and cause rebound flares. Potency, site and duration all matter.",
      ],
      [
        "Screening before biologics",
        "TB and hepatitis testing precede any immune-modulating therapy. This is standard, non-negotiable practice.",
      ],
    ],
    keyfacts: [
      ["Biologics", "Transformative", "For severe psoriasis, when used with proper screening"],
      ["Phototherapy", "Underrated", "Narrowband UVB remains excellent value for many"],
      ["Vitiligo", "Treatable course", "Stability first, then grafting or light therapy"],
      ["Maintenance", "Designed for home", "Plans that survive the flight back"],
    ],
    conditions: [
      ["Psoriasis", "Topicals through phototherapy to biologics, matched to severity"],
      ["Vitiligo", "Stabilisation therapy, phototherapy, and surgical grafting in selected cases"],
      ["Eczema and contact dermatitis", "Patch testing and barrier-repair regimens"],
      ["Hair loss", "Scarring versus non-scarring causes, treated differently and early"],
      ["Acne and scarring", "Systemic therapy and structured scar revision later"],
      ["Skin lesions and mole checks", "Dermoscopy-led assessment, excision when justified"],
    ],
    proceduresIntro:
      "Dermatology procedures are mostly minor — biopsies, excisions, intralesional therapy, phototherapy courses — but their diagnostic quality decides whether the strong drugs that follow are justified.",
    clauses: [
      ["Dermoscopy, not guesswork", "Mole assessment with dermatoscopy and photographic follow-up beats reflex excision."],
      ["Screening before biologics", "TB and hepatitis screening before immune-modulating therapy is mandatory practice."],
      ["A plan you can continue", "Prescriptions mapped to what is available in your country, with remote reviews."],
    ],
    risksProse:
      "Strong topical steroids thin skin when misused — a common problem with unsupervised regimens. Biologics raise infection risk and require screening and monitoring. Phototherapy adds cumulative UV exposure managed by dosimetry. None of these are reasons to suffer silently; they are reasons to be treated properly.",
    dontTravel: [
      ["Blistering peeling rash with fever", "Possible Stevens-Johnson syndrome — emergency now."],
      ["Rapidly spreading painful redness", "Cellulitis needs antibiotics before travel."],
      ["New changing mole with bleeding", "Have it assessed locally first if travel is weeks away."],
    ],
    tripScenario: "A patient with severe psoriasis considering biologic therapy.",
    tripSteps: [
      ["Send photographs — day one", "Well-lit images of affected areas and a list of every treatment already tried."],
      ["Written opinion — within 48 hours", "Whether biologic therapy is justified and which screening is needed."],
      ["Assessment — days one to two", "Severity scoring, screening bloods, TB and hepatitis tests."],
      ["Treatment started — week one", "First dose supervised, with injection training if self-administered."],
      ["Home continuation", "Supply arranged, monitoring schedule shared with your local doctor."],
    ],
    relatedLinks: [
      ["/doctors/", "Find doctors"],
      ["/how-it-works/", "How this works"],
      ["/contact/", "Contact"],
    ],
    faqs: [
      ["Is biologic therapy affordable in India?", "Indian-made biosimilars have brought costs down dramatically compared with Western prices, and response is usually visible within weeks. We quote honestly before you commit."],
      ["Can vitiligo really be treated?", "Spread can usually be stopped, and repigmentation achieved in many stable patches with light therapy or grafting. Face patches respond best; hands worst. Honest expectations matter here."],
      ["Why does my eczema keep returning?", "Because barrier repair and trigger avoidance are continuous, not curative. Patch testing finds specific triggers many patients never knew they had."],
      ["Do I need to visit India at all?", "Often not for routine care. Trips make sense for biologic initiation, patch testing and procedures — with remote follow-up designed around whatever is available locally."],
    ],
  },
  {
    slug: "dental",
    name: "Dental care",
    h1: "Dental treatment in India",
    lede: "Implants, full-mouth rehabilitation, root canal treatment and corrective jaw work, planned digitally and priced honestly — with the sequencing decided before you fly.",
    insight:
      "Dental tourism fails in a predictable way: implants placed fast, without planning, followed by silence. Done properly — digital planning, honest bone assessment, staged loading — implant dentistry has excellent outcomes and a real price advantage.",
    emergency:
      "Facial swelling spreading towards the eye or under the jaw, difficulty swallowing or opening the mouth, with a toothache — dental infection spreading to these spaces is an emergency today.",
    readFirstTitle: "Implant dentistry succeeds in the planning",
    readFirstBody:
      "Dental tourism fails in a predictable way: implants placed quickly without imaging or staging, followed by silence when problems appear. Done properly — CBCT planning, honest bone assessment, staged loading — outcomes are excellent.",
    readFirstPoints: [
      [
        "No scan, no quote",
        "A CBCT scan measures the bone you actually have. Anyone quoting implants without one is estimating with your jaw as the stake.",
      ],
      [
        "Healing cannot be hurried",
        "Implants fuse to bone over two to four months. Plans that promise everything in one trip are either using immediate-loading selectively or cutting biology.",
      ],
      [
        "Gum health comes first",
        "Placing implants into untreated gum disease is planting in poor soil. Periodontal treatment precedes implant work in any sound plan.",
      ],
    ],
    keyfacts: [
      ["Planning first", "CBCT scan", "Implant positions decided digitally, not by eye"],
      ["Staging", "Two trips", "Implants often need placement, healing, then restoration"],
      ["Bone grafting", "Sometimes", "Decided by measurement, not salesmanship"],
      ["Guarantee", "In writing", "Materials and workmanship terms before treatment starts"],
    ],
    conditions: [
      ["Missing teeth", "Single implants to full-arch solutions"],
      ["Failing dentitions", "Sequenced extraction, grafting and rehabilitation"],
      ["Root canal problems", "Microscope-endodontics saving teeth others would extract"],
      ["Gum disease", "Periodontal treatment that makes implants safe"],
      ["Malocclusion and jaw surgery", "Orthodontics combined with corrective surgery when needed"],
      ["Full-mouth wear", "Rehabilitation restoring bite and function"],
    ],
    proceduresIntro:
      "Implant dentistry is precision work built on imaging: a CBCT scan, digital planning, guided surgery, and patience during osseointegration. Rushing the biology is where failures begin.",
    clauses: [
      ["CBCT before quotes", "Anyone quoting implants without a CT scan is guessing at your bone."],
      ["Brand transparency", "Implant systems vary in documentation and longevity data. You should know exactly which system goes into your mouth."],
      ["Written guarantees", "Materials and workmanship terms agreed in advance, honoured across borders."],
    ],
    risksProse:
      "Implant failure rates are low but real, higher in smokers and uncontrolled diabetics. Nerve proximity in the lower jaw and sinus anatomy in the upper jaw demand proper imaging. Full-mouth rehabilitation is dentistry's most demanding discipline — outcome depends on the planning team as much as the surgeon.",
    dontTravel: [
      ["Spreading facial swelling", "Space infections threaten airways — emergency care first."],
      ["Active gum infection", "Treat periodontal disease before implants, not after failure."],
      ["Uncontrolled diabetes", "Healing compromise is predictable — stabilise first."],
    ],
    tripScenario: "A patient travelling for full-arch implant rehabilitation.",
    tripSteps: [
      ["Send records — day one", "Any recent X-rays, photographs, and your denture or bite history."],
      ["Written plan — within 48 hours", "Whether implants suit you, staging, and an all-in cost range."],
      ["Trip one — one to two weeks", "CBCT, extractions and grafting if needed, implant placement."],
      ["Healing at home — two to four months", "Osseointegration happens wherever you live."],
      ["Trip two — about ten days", "Digital scans, abutments and final teeth."],
      ["Maintenance", "Six-monthly reviews locally, remote check-ins with us."],
    ],
    relatedLinks: [
      ["/hospitals/", "Partner hospitals"],
      ["/how-we-select/", "How we select providers"],
      ["/contact/", "Contact"],
    ],
    faqs: [
      ["Why two trips?", "Because bone fuses to implants over two to four months and that biology cannot be hurried. Some cases allow immediate loading, but that is a decision made from your scan, not your calendar."],
      ["Are implants in India cheaper because they are worse?", "No — the price difference is overhead and currency, not quality, provided genuine branded systems are used. Our selection process verifies exactly that."],
      ["What if something fails after I return home?", "The guarantee terms are agreed in writing before treatment, including revision arrangements. Failures are rare when planning is proper, but honesty about who bears the cost is part of the quote."],
      ["Can all my remaining teeth be saved?", "Sometimes, and often that is the better plan. A dentist whose default answer is extraction-for-everything is selling implants; one who saves salvageable teeth first is practising dentistry."],
    ],
  },
];

function esc(s) {
  return s;
}

const CHECK_SVG =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5 11-11"/></svg>';
const WARN_IC =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8v5M12 16.5v.5" stroke-linecap="round"/><path d="M10.3 3.2 2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.2a2 2 0 0 0-3.4 0z" stroke-linejoin="round"/></svg>';
const DOT_IC =
  '<svg class="wpoint__i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5M12 15.7v.4"/></svg>';

function hero(s) {
  const toc = [
    ["read-first", "Read this first"],
    ["conditions", "Conditions we treat"],
    ["procedures", "Procedures, stay and recovery"],
    ["selection", "How we choose the provider"],
    ["risks", "Risks, and who should not travel"],
    ["trip", "What your trip looks like"],
    ["faq", "Questions patients ask"],
  ]
    .map(([a, t]) => `<li><a href="#${a}">${t}</a></li>`)
    .join("");
  const kfs = s.keyfacts
    .map(
      ([k, v, d]) =>
        `<div class="kf"><span class="kf__k">${k}</span><div class="kf__v">${v}</div><div class="kf__d">${d}</div></div>`,
    )
    .join("");
  const wa = `https://wa.me/918303586344?text=Hello%2C%20I%20would%20like%20to%20ask%20about%20${encodeURIComponent(
    s.name.toLowerCase(),
  )}%20in%20India`;
  return `<section class="hero">
  <div class="wrap">
    <h1 style="max-width:17ch">${s.h1}</h1>
    <p class="lede" style="margin-block-start:24px;max-width:66ch">${s.lede}</p>
    <p class="hero__body" style="max-width:66ch">${s.insight}</p>
    <div class="btns">
      <a class="btn btn--solid" href="#contact">Send my reports</a>
      <a class="btn btn--line" href="${wa}">Talk to us on WhatsApp</a>
    </div>
    <p class="hero__note">Free. No obligation. A written opinion within 48 hours.</p>
    <div class="byline">
      <span>Clinically reviewed by <b>Dr. Annie Varughese</b>, MD, FACC</span>
      <span>Clinical oversight <b>Dr. Annie Varughese, MD, FACC</b></span>
      <span>Last reviewed <b>${MONTH}</b></span>
      <span><a href="/editorial-policy/">Editorial and medical review policy</a></span>
    </div>
    <div class="keyfacts">${kfs}</div>
    <div class="toc">
      <span class="toc__k">On this page</span>
      <ol>${toc}</ol>
    </div>
  </div>
</section>`;
}

function emergBand(s) {
  return `<div class="emerg">
  <div class="wrap emerg__in">
    ${WARN_IC.replace("<svg ", '<svg style="flex:0 0 auto" ')}
    <p><b>${s.emergency.split(".")[0]}.</b> ${s.emergency
    .split(".")
    .slice(1)
    .join(".")
    .trim()}</p>
  </div>
</div>

<div class="wrap crumbs"><a href="/">Home</a> &nbsp;/&nbsp; <a href="/treatments/">Treatments</a> &nbsp;/&nbsp; ${s.name}</div>`;
}

function readFirst(s) {
  return `<section class="band band--tone rise" id="read-first">
  <div class="wrap rail"><div class="rail__label">Read first</div><div>
<div class="warn">
        <div class="warn__h"><span class="warn__ic">${WARN_IC}</span><h3>${
    s.readFirstTitle || "Get the indication right before you get on a plane"
  }</h3></div>
        <div class="warn__body"><p>${s.readFirstBody}</p></div>
        <div class="wgrid">${s.readFirstPoints
          .map(
            ([t, d]) =>
              `<div class="wpoint">${DOT_IC}<div><b>${t}</b><p>${d}</p></div></div>`,
          )
          .join("")}</div>
      </div>
  </div></div>
</section>`;
}

function conditions(s) {
  const items = s.conditions
    .map(
      ([b, p]) =>
        `<div class="ci" style="--c:#3D6B8A">${CHECK_SVG}<div><b>${b}</b><p>${p}</p></div></div>`,
    )
    .join("");
  return `<section class="band rise" id="conditions">
  <div class="wrap rail"><div class="rail__label">Conditions</div><div>
      <h2>Conditions we treat</h2>
      <p class="lede">The conditions we are asked about most.</p>
      <div class="clist">${items}</div>
      <div class="prose" style="margin-block-start:26px">
        <p>Detailed condition pages are being added continuously. In the meantime send your reports and you will get the same written opinion within 48 hours, from the same clinical team that reviews every case.</p>
      </div>
  </div></div>
</section>`;
}

function procedures(s) {
  return `<section class="band band--tone rise" id="procedures">
  <div class="wrap rail"><div class="rail__label">Procedures</div><div>
      <h2>Procedures, stay and recovery</h2>
      <p class="lede">${s.proceduresIntro}</p>
  </div></div>
</section>`;
}

function selection(s) {
  const clauses = s.clauses
    .map(
      ([k, p]) =>
        `<div class="clause"><span class="clause__k">${k}</span><p>${p}</p></div>`,
    )
    .join("");
  const extra = s.selectionExtra
    ? `<div class="prose"><p>${s.selectionExtra}</p></div>`
    : "";
  return `<section class="band band--ink rise" id="selection">
  <div class="wrap rail"><div class="rail__label">Selection</div><div>
      <h2>How we choose the provider</h2>
      <div class="clauses">${clauses}</div>
      ${extra}
  </div></div>
</section>`;
}

function risks(s) {
  const pts = s.dontTravel
    .map(
      ([t, d]) =>
        `<div class="wpoint">${DOT_IC}<div><b>${t}</b><p>${d}</p></div></div>`,
    )
    .join("");
  return `<section class="band rise" id="risks">
  <div class="wrap rail"><div class="rail__label">Honestly</div><div>
      <h2>Risks, and who should not travel</h2>
      <div class="prose"><p>${s.risksProse}</p></div>
<div class="warn">
        <div class="warn__h"><span class="warn__ic">${WARN_IC}</span><h3>Some patients should not travel yet</h3></div>
        <div class="wgrid">${pts}</div>
      </div>
  </div></div>
</section>`;
}

function trip(s) {
  const rows = s.tripSteps
    .map(
      ([t, d], i) =>
        `<div class="crit__row"><span class="crit__n">${String(i + 1).padStart(2, "0")}</span><div><div class="crit__t">${t}</div><div class="crit__d">${d}</div></div></div>`,
    )
    .join("");
  return `<section class="band band--tone rise" id="trip">
  <div class="wrap rail"><div class="rail__label">Your trip</div><div>
      <h2>What your trip looks like</h2>
      <p class="lede">${s.tripScenario}</p>
      <div class="crit" style="margin-block-start:28px">${rows}</div>
  </div></div>
</section>`;
}

function faq(s) {
  const items = s.faqs
    .map(
      ([q, a], i) =>
        `<div class="faq__item${i === 0 ? " open" : ""}">
          <button class="faq__q" aria-expanded="${i === 0 ? "true" : "false"}">${q}<span class="faq__sign" aria-hidden="true"></span></button>
          <div class="faq__a"><div><p>${a}</p></div></div>
        </div>`,
    )
    .join("\n        ");
  return `<section class="band rise" id="faq">
  <div class="wrap rail"><div class="rail__label">Questions</div><div>
      <h2>Questions patients ask</h2>
      <div class="faq">
        ${items}
      </div>
  </div></div>
</section>`;
}

function related(s) {
  if (!s.relatedLinks || !s.relatedLinks.length) return "";
  const links = s.relatedLinks
    .map(
      ([href, label]) =>
        `<a href="${href}">${label}</a>`,
    )
    .join(" &nbsp;\u00B7&nbsp; ");
  return `<section class="band band--tone rise" id="related-pages">
  <div class="wrap rail"><div class="rail__label">Related</div><div>
      <h2>Related pages</h2>
      <div class="prose"><p><strong>Related pages:</strong>\n          ${links}\n        </p></div>
  </div></div>
</section>`;
}

function contact(s) {
  return `<section class="band rise" id="contact">
  <div class="wrap rail"><div class="rail__label">Contact</div><div>
      <h2>Send us your reports</h2>
      <p class="lede">${s.contactLede || "Send whatever you already have — reports, scans, photographs. You will get a written opinion with costs within 48 hours."}</p>
      <div class="form">
        <div><label for="n">Your name</label><input id="n" type="text" required></div>
        <div><label for="c">Country</label><select id="c"><option>Iraq</option><option>Bangladesh</option><option>Uzbekistan</option><option>Oman</option><option>Yemen</option><option>Sudan</option><option>Ghana</option><option>Ethiopia</option><option>Other</option></select></div>
        <div><label for="w">WhatsApp number</label><input id="w" type="tel" placeholder="+964 …" required></div>
        <div><label for="e">Email (optional)</label><input id="e" type="email"></div>
        <div class="f-full"><label for="d">Describe the problem, how long you have had it, and what you have tried so far</label><textarea id="d" required></textarea></div>
        <div class="f-full"><label for="f">Upload reports</label><div class="file">Photographs, scans or PDF · up to 25 MB<br><input id="f" type="file" multiple style="margin-block-start:12px;border:0;padding:0;background:none;width:auto"></div></div>
        <div class="f-full">
          <button class="btn btn--solid" type="button">Send for review</button>
          <p class="form__note">Your reports go directly to our medical team. We do not share your records with hospitals until you tell us to.</p>
        </div>
      </div>
      <div style="margin-block-start:44px;padding-block-start:30px;border-block-start:1px solid var(--rule);font-size:16px">
        <p style="margin-block-end:.5em"><strong>WhatsApp</strong> +91 83035 86344 &nbsp;\u00B7&nbsp; <strong>Phone</strong> +91 83035 86344 &nbsp;\u00B7&nbsp; <strong>Email</strong> tibhind@gmail.com</p>
        <p style="color:var(--muted);font-size:15px;margin-block-end:0">Coordinators available 9:00\u201320:00 IST. We speak Arabic, English, Russian and Bengali.</p>
      </div>
  </div></div>
</section>`;
}

function jsonLd(s) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://tibhind.com/" },
          {
            "@type": "ListItem",
            position: 2,
            name: "Treatments",
            item: "https://tibhind.com/treatments/",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: s.name,
            item: `https://tibhind.com/treatments/${s.slug}/`,
          },
        ],
      },
      {
        "@type": "MedicalWebPage",
        name: s.name,
        url: `https://tibhind.com/treatments/${s.slug}/`,
        lastReviewed: TODAY,
        specialty: "https://schema.org/MedicalSpecialty",
        about: s.name,
        description: s.lede,
      },
    ],
  });
}

let created = [];
let failed = [];

for (const s of SPECIALTIES) {
  const route = `/treatments/${s.slug}/`;
  const id = `treatments-${s.slug}`;
  const file = path.join(DATA_DIR, `${id}.json`);
  if (fs.existsSync(file)) {
    console.log("skip existing:", route);
    continue;
  }

  const body = [
    "\r\n\r\n",
    NAV,
    "\r\n\r\n",
    emergBand(s),
    "\r\n\r\n",
    hero(s),
    "\r\n\r\n",
    readFirst(s),
    "\r\n\r\n",
    conditions(s),
    "\r\n\r\n",
    procedures(s),
    "\r\n\r\n",
    selection(s),
    "\r\n\r\n",
    risks(s),
    "\r\n\r\n",
    trip(s),
    "\r\n\r\n",
    faq(s),
    "\r\n\r\n",
    related(s),
    "\r\n\r\n",
    contact(s),
    "\r\n\r\n\r\n",
    FOOTER,
    "\r\n",
  ].join("");

  // validate every internal link resolves
  const bad = [...body.matchAll(/href="(\/[^"#]*)"/g)]
    .map((m) => m[1])
    .filter((h) => h !== "/" && !routes.has(h));
  if (bad.length) {
    failed.push([route, [...new Set(bad)]]);
    continue;
  }

  const page = {
    id,
    route,
    canonical: `https://tibhind.com${route}`,
    title: `${s.h1.charAt(0).toUpperCase() + s.h1.slice(1)} | TIB HIND`,
    description: s.lede,
    robots: null,
    styles: TEMPLATE.styles,
    jsonLd: [jsonLd(s)],
    headScripts: TEMPLATE.headScripts,
    body,
    source: "generated: scripts/create-missing-treatment-pages.js",
  };

  fs.writeFileSync(file, JSON.stringify(page, null, 2) + "\n");
  created.push(route);
}

created.forEach((r) => console.log("created:", r));
if (failed.length) {
  failed.forEach(([r, b]) => console.log("FAILED", r, "missing targets:", b.join(", ")));
  process.exit(1);
}
