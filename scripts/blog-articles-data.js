// Article content for the Medical Treatment Blog (source of truth: hub cards in
// new changes/new-update-Blog-page.html). Each article is authored in the site's
// established blog design (blog-* classes) and is specific to its topic.
//
// Categories map 1:1 to the hub filters (planning, hospital, visa, cost, heart,
// cancer, ortho, wellness, safety).

const WA_URL =
  "https://wa.me/918303586344?text=Hello%20TIB%20HIND%2C%20I%20would%20like%20help%20planning%20medical%20treatment%20in%20India.";

const authorHtml =
  '<div class="blog-author"><div class="blog-avatar">TH</div><div><strong>TIB HIND Editorial Team</strong><p>This article was prepared for international readers and checked for clear role boundaries, responsible medical language and practical planning value. Clinically significant decisions should always be reviewed by the treating specialist.</p></div></div>';

const ctaHtml =
  '<section class="blog-cta"><div class="wrap blog-cta__in"><div><h2>Get help planning treatment in India</h2><p>Share your available reports for organised review and guidance on suitable next steps. Medical decisions remain with qualified doctors and hospitals — no outcome can be guaranteed.</p></div><a class="btn blog-arrow-btn" href="' +
  WA_URL +
  '"><span>WhatsApp +91 83035 86344</span></a></div></section>';

// --- authored articles 2..9 -------------------------------------------------
// Each entry: slug, category, eyebrow, h1, deck, meta (category label), date
// (YYYY-MM-DD), read (mins), bannerLines (eyebrow + 2-3 title lines),
// toc [ {id,label} ], body (inner HTML of <article>), sourcesHtml.

const ARTICLES = [
  {
    slug: "choose-hospital-doctor-india",
    category: "Hospitals & doctors",
    filter: "hospital",
    eyebrow: "Hospitals & doctors",
    h1: "How to Choose a Hospital and Doctor in India",
    deck: "A practical method for selecting the doctor and hospital together — using relevant specialty experience, real capability checks and patient-safety signals rather than advertising or price alone.",
    date: "2026-08-22",
    read: 12,
    banner: { eyebrow: "Hospitals & doctors", lines: ["How to Choose a Hospital", "and Doctor", "in India"] },
    toc: [
      { id: "why-pair", label: "Why the pair matters" },
      { id: "doctor-first", label: "Verify the doctor first" },
      { id: "hospital-next", label: "Verify the hospital" },
      { id: "accreditation", label: "Accreditation" },
      { id: "intl-services", label: "International patient services" },
      { id: "compare", label: "Compare fairly" },
      { id: "questions", label: "Questions to ask" },
      { id: "faq", label: "Questions patients ask" },
    ],
    body:
      '<p class="blog-lead">Most people begin with one question: \u201CWhich hospital is best?\u201D The more useful question is a pair: \u201CWhich doctor has real experience with my condition, and does that doctor practise in a hospital that can actually support my case?\u201D A skilled specialist cannot manage your care well in a facility that lacks the services your condition may need, and a well-equipped hospital does not on its own replace relevant clinical experience.</p>' +
      '<p>This article gives an organised method for comparing providers in India. It is intended for patients choosing planned care abroad and does not replace advice from qualified doctors.</p>' +
      '<section class="blog-dark-section"><h2 id="why-pair">Start with the clinical question, not the ranking</h2>' +
      '<p>The right provider depends on the decision your case needs. Confirming a diagnosis, treating a specific condition, a second opinion, a complex revision or routine surgery each point to different specialties, facilities and timelines. Write down the medical question you need answered, then look for a team whose daily work matches that question.</p></section>' +
      '<h2 id="doctor-first">Verify the doctor before the hospital</h2>' +
      '<p>Hospital size and brand name do not prove that a specific doctor is right for you. Check the basics, then look for evidence of relevant experience.</p>' +
      '<ul class="blog-checklist"><li>Confirm the doctor is registered with the recognised medical council in India and that the registration is current.</li><li>Check specialty training, qualifications and any subspecialty fellowship relevant to your condition.</li><li>Ask how often the doctor manages cases like yours, and roughly how many they have managed.</li><li>Ask who actually performs the key part of the procedure and who covers you in an emergency or at night.</li><li>Confirm the hospital where the doctor currently practises and whether that branch is the one you are considering.</li><li>Ask whether the doctor offers a remote case review before you travel.</li></ul>' +
      '<div class="blog-callout"><strong>A broad title can hide a specialty gap.</strong> A \u201Ccardiac surgeon\u201D may not specialise in your specific procedure. Ask directly about experience with your condition, not only the general specialty.</div>' +
      '<h2 id="hospital-next">Verify the hospital for your specific needs</h2>' +
      '<p>Choose the hospital for the capabilities your case could realistically need, not for the ones advertised. Consider intensive care, blood bank, imaging, pathology, emergency cover, infection-control processes, rehabilitation and specialist backup.</p>' +
      '<div class="blog-table-wrap"><table><thead><tr><th>Area</th><th>Useful question</th><th>Why it matters</th></tr></thead><tbody>' +
      '<tr><td>ICU and emergency</td><td>Is intensive care available on site, and is there 24-hour emergency cover?</td><td>Conditions can change quickly and need rapid access to support.</td></tr>' +
      '<tr><td>Imaging and pathology</td><td>Are CT, MRI, ultrasound and laboratory services in the same hospital?</td><td>Moving between buildings can delay urgent results.</td></tr>' +
      '<tr><td>Blood bank</td><td>Is there an in-house blood bank and blood transfusion service?</td><td>Some procedures need blood products promptly.</td></tr>' +
      '<tr><td>Rehabilitation</td><td>Is physiotherapy and rehab provided by the treating team?</td><td>Recovery depends on rehabilitation, not only the operation.</td></tr>' +
      '<tr><td>Specialist backup</td><td>Are other specialties (cardiology, anaesthesia, nephrology) available for support?</td><td>Complex patients may need more than one specialty.</td></tr>' +
      '<tr><td>Infection control</td><td>What infection-prevention processes does the hospital follow?</td><td>Infection is a leading avoidable risk around procedures.</td></tr>' +
      '</tbody></table></div>' +
      '<h2 id="accreditation">What accreditation does and does not tell you</h2>' +
      '<p>NABH accreditation is a structured quality and patient-safety signal for hospitals in India; JCI accreditation can provide another external quality reference. Accreditation helps narrow the field — but it does not guarantee an individual outcome, and it does not replace case-specific due diligence. Confirm that the specific hospital location you plan to use is the accredited one; hospital groups sometimes have multiple branches with different statuses.</p>' +
      '<h2 id="intl-services">Check international patient services</h2>' +
      '<p>An international patient office can make a real difference: medical interpreters for consent and discharge discussions, help with the medical visa invitation letter, transparent quotations, alternative payment arrangements and follow-up coordination. Ask which services are included and which carry a separate fee, and ask how the coordinator is paid. A coordinator should not diagnose, choose a treatment, promise an outcome or pressure you into a specific hospital.</p>' +
      '<h2 id="compare">Compare providers fairly</h2>' +
      '<p>Compare proposals with the same assumptions. Same procedure, same room category, same inclusions, same expected stay and same implant assumptions. Price matters, but clinical suitability, transparency and follow-up access are part of the total value — a low quotation that excludes major components is not the same offer.</p>' +
      '<h2 id="questions">Questions to ask before choosing</h2>' +
      '<ul class="blog-checklist"><li>What experience does the treating doctor have with my exact condition or procedure?</li><li>Which hospital is doing the procedure, and is that location accredited?</li><li>Who is responsible before admission, during the stay and after discharge?</li><li>Can I receive a written proposed plan and written estimate before travelling?</li><li>Is an interpreter available for medical discussions and consent?</li><li>How do I reach the team if there is a problem after I return home?</li><li>What happens if my condition needs an urgent hospital visit while I am in India?</li></ul>' +
      '<div class="blog-quick"><div><b>1</b>Fix the clinical question first.</div><div><b>2</b>Verify the doctor and the specific hospital location.</div><div><b>3</b>Compare written plans and estimates on the same basis.</div></div>' +
      '<h2 id="faq">Questions patients ask</h2><div class="blog-faq">' +
      "<details><summary>Is the most expensive hospital the best choice?</summary><p>Not necessarily. Choose based on clinical fit for your case, the treating doctor's relevant experience, hospital capability, transparency and follow-up access. Price should be compared only on the same inclusions and assumptions.</p></details>" +
      "<details><summary>Should I choose a doctor or a hospital first?</summary><p>Choose them together. The doctor needs a facility that can support your case, and the hospital needs a team with relevant experience. Begin with the clinical question, then assess the pair.</p></details>" +
      "<details><summary>How important is accreditation?</summary><p>Accreditation is a useful external quality and patient-safety signal, but it is not a guarantee of any individual outcome. Confirm the specific location you intend to use is the accredited one.</p></details>" +
      "<details><summary>Should I get a second opinion?</summary><p>A second opinion is valuable for major procedures, cancer care, transplants or when proposals differ. Send complete records to each reviewer and compare reasoning, not just quoted prices.</p></details>" +
      "</div>" +
      authorHtml +
      '<section class="blog-sources"><h2>Related reading on this site</h2><p>See our <a href="/how-we-select/">How TIB HIND selects hospitals</a>, the <a href="/hospitals/">hospital directory</a>, the <a href="/best-hospitals-india/">best hospitals</a> list and the <a href="/editorial-policy/">editorial and review policy</a> for how provider information is assessed.</p><p><strong>Medical disclaimer:</strong> This article provides general information only. It does not recommend a specific doctor, hospital or treatment. Clinical decisions should be made with qualified treating professionals.</p></section>',
  },

  {
    slug: "medical-visa-india-guide",
    category: "Medical travel",
    eyebrow: "Medical visa & travel",
    h1: "Medical Visa for India: A Patient Planning Guide",
    deck: "Understand which visa route applies to planned medical care in India, the documents and hospital letter required, the attendant route and the application checks that avoid problems at the border.",
    date: "2026-08-18",
    read: 11,
    banner: { eyebrow: "Medical visa & travel", lines: ["Medical Visa for India:", "A Patient Planning Guide"] },
    toc: [
      { id: "which-visa", label: "Which visa route" },
      { id: "documents", label: "Documents you need" },
      { id: "hospital-letter", label: "The hospital letter" },
      { id: "attendant", label: "Medical attendant visa" },
      { id: "apply", label: "How to apply" },
      { id: "before-travel", label: "Before you travel" },
      { id: "after-arrival", label: "After you arrive" },
      { id: "faq", label: "Questions patients ask" },
    ],
    body:
      '<p class="blog-lead">Visa requirements for medical care in India change, so treat this article as a planning framework and verify the details on the official Government of India visa portal before you apply. India provides a dedicated medical visa route for people travelling for planned medical treatment abroad, and the rules about which route applies depend on your nationality, the purpose of travel and the treatment involved.</p>' +
      '<p>This guide explains the standard documents, the hospital letter, the attendant route and the checks that help an application go smoothly. It does not replace official instructions or advice from the Indian mission responsible for your country.</p>' +
      '<section class="blog-dark-section"><h2 id="which-visa">Start by identifying the correct visa route</h2>' +
      '<p>For planned medical treatment, applicants generally use the Medical Visa or, where eligible, the e-Medical Visa route. A tourist visa is generally not appropriate for planned medical care. The correct route depends on current government rules, so begin on the official Indian visa portal and confirm the category that applies to your nationality and purpose.</p>' +
      '<p>Check each of these before applying: passport validity (leaving more than six months is commonly expected — confirm the current rule), recent photographs, the treat-and-travel plan, supporting documents for the treatment, and the port through which you plan to enter. Requirements such as permitted entry points and validity can change.</p></section>' +
      '<h2 id="documents">Documents you normally need</h2>' +
      '<ul class="blog-checklist"><li>Passport valid for the required period with blank pages for the visa sticker.</li><li>Recent digital photograph meeting the official specifications.</li><li>The treatment plan and supporting medical reports from the hospital or doctor in India.</li><li>A medical visa invitation letter from the treating hospital where requested.</li><li>Evidence of funds to cover the treatment and stay, where required.</li><li>Return or onward travel itinerary where required.</li><li>Any additional documents listed by the Indian mission for your country.</li></ul>' +
      '<h2 id="hospital-letter">The hospital invitation letter</h2>' +
      '<p>The hospital letter should clearly identify the patient, the hospital and contact details, the consultant, the proposed treatment, the expected duration of treatment and stay, and the contact for visa-related questions. Ask the hospital\u2019s international patient office for this letter early and check the details are correct before applying.</p>' +
      '<div class="blog-callout"><strong>Check details twice.</strong> A letter with a misspelt name, an outdated hospital branch or missing dates can delay or complicate an application. Ask for a corrected copy before you submit.</div>' +
      '<h2 id="attendant">The medical attendant route</h2>' +
      '<p>Patients often travel with a family member or attendant. Under current official e-Visa guidance, up to two e-Medical Attendant visas may be granted against one e-Medical Visa. Requirements and limits can change, and the attendant route is not automatic — confirm eligibility for your application on the official portal.</p>' +
      '<h2 id="apply">How the application works</h2>' +
      '<div class="blog-steps">' +
      '<section class="blog-step"><div><h3>Check official eligibility</h3><p>Use the Government of India e-Visa portal or the Indian mission responsible for your country. Confirm whether you use the e-Medical Visa form or a regular Medical Visa application.</p></div></section>' +
      '<section class="blog-step"><div><h3>Prepare documents</h3><p>Gather the passport, photograph, hospital letter and supporting medical and travel documents before you begin the form, so information is consistent.</p></div></section>' +
      '<section class="blog-step"><div><h3>Submit the application</h3><p>Complete the online form, pay the applicable fee where required, and submit within the recommended window before travel. Keep the application reference number.</p></div></section>' +
      '<section class="blog-step"><div><h3>Check the grant carefully</h3><p>When approved, verify the validity, number of entries, permitted port and the name on the visa. Raise any mismatch before you travel.</p></div></section>' +
      '</div>' +
      '<div class="blog-quick"><div><b>1</b>Confirm the route that applies to you.</div><div><b>2</b>Prepare the hospital letter and documents early.</div><div><b>3</b>Verify the grant details before departure.</div></div>' +
      '<h2 id="before-travel">Before you travel</h2>' +
      '<p>Keep printed and digital copies of the passport, visa grant, hospital letter, medical summary, treating hospital contact, accommodation details, return or onward tickets, prescriptions and insurance documents. Each accompanying traveller should carry their own valid documents. If the patient needs wheelchair service, oxygen or medical clearance, contact the airline early because rules vary by airline and destination.</p>' +
      '<h2 id="after-arrival">After you arrive</h2>' +
      '<p>Enter through the permitted port and keep the documents together. Some may need to register with the local Foreigners Regional Registration Office depending on the visa conditions and length of stay — check and follow the rule that applies to your visa. Do not overstay the validity, and keep the hospital informed of your plans.</p>' +
      '<h2 id="faq">Questions patients ask</h2><div class="blog-faq">' +
      "<details><summary>Can I use a tourist visa for planned medical treatment?</summary><p>Generally no. Planned medical care has a dedicated medical visa route. Rely on the official Indian visa portal and the Indian mission for your country rather than on assumptions or old information.</p></details>" +
      "<details><summary>Can my family travel as attendants?</summary><p>Yes, up to two attendants may generally travel under the e-Medical Attendant route against one e-Medical Visa under current guidance. Confirm eligibility and limits on the official portal for your application.</p></details>" +
      "<details><summary>Which airports allow entry on an e-Medical Visa?</summary><p>Permitted entry points are set by the government and can change. Check the official e-Visa guidance for approved disembarkation points before booking flights.</p></details>" +
      "<details><summary>What if my treatment lasts longer than the visa?</summary><p>Visa validity and extensions are granted under official rules rather than by the hospital. Plan treatment timing with the treating team and check extension or re-entry options on the official portal if you expect a long stay.</p></details>" +
      "</div>" +
      authorHtml +
      '<section class="blog-sources"><h2>Sources and verification</h2><p>Visa information was checked against the Government of India\u2019s <a href="https://indianvisaonline.gov.in/" rel="noopener">India Visa Online</a> portal and its <a href="https://indianvisaonline.gov.in/evisa/tvoa.html" rel="noopener">official e-Visa guidance</a>. Requirements can change; verify again before applying and again before travelling. See also our <a href="/medical-visa/">medical visa page</a>.</p><p><strong>Medical disclaimer:</strong> This article provides general travel-planning information only and does not constitute visa, legal or medical advice.</p></section>',
  },

  {
    slug: "treatment-estimate-guide",
    category: "Treatment costs",
    eyebrow: "Treatment costs",
    h1: "What a Treatment Estimate Should Include",
    deck: "Learn how to read a hospital estimate, identify the items that are usually included and excluded, and ask the questions that prevent the final bill from being a surprise.",
    date: "2026-08-14",
    read: 9,
    banner: { eyebrow: "Treatment costs", lines: ["What a Treatment Estimate", "Should Include"] },
    toc: [
      { id: "package-vs-estimate", label: "Package vs estimate" },
      { id: "included", label: "What is usually included" },
      { id: "excluded", label: "What is usually excluded" },
      { id: "assumptions", label: "Assumptions that change the bill" },
      { id: "questions", label: "Questions before paying" },
      { id: "compare", label: "Compare like for like" },
      { id: "faq", label: "Questions patients ask" },
    ],
    body:
      '<p class="blog-lead">A preliminary estimate is not a final bill. It is normally based on the records available before examination, and several factors — test results, treatment changes, length of stay, implant choice, medicines and unexpected events — can change the total. Reading an estimate properly means knowing the assumptions behind the figure and the items it does not cover.</p>' +
      '<p>This article explains what should reasonably be included in a treatment estimate in India, what usually sits outside it, and the questions to ask before you pay a deposit. It is general guidance and does not replace the hospital\u2019s own written quotation.</p>' +
      '<h2 id="package-vs-estimate">Know the difference: package, estimate and deposit</h2>' +
      '<p>A treatment package is a fixed figure for a defined care bundle. An estimate is a projected figure that can move with the clinical plan. A deposit is money paid in advance, not a total. Ask which type of document you are being given and what the figure commits the hospital to.</p>' +
      '<h2 id="included">What a hospital estimate should include</h2>' +
      '<ul class="blog-checklist"><li>Pre-admission consultation and tests relevant to the plan</li><li>Surgeon, anaesthetist and team fees</li><li>Operating theatre time and standard consumables</li><li>Room and nursing care for the assumed number of days</li><li>Standard medicines and disposables used during the stay</li><li>Implant or device, where the plan includes one</li><li>ICU care for a specified period, if expected</li><li>Blood products, where relevant</li><li>Pathology and imaging performed during the stay</li><li>Scheduled follow-up consultations included in the package</li></ul>' +
      '<h2 id="excluded">What usually sits outside the hospital bill</h2>' +
      '<div class="blog-callout"><strong>Read the exclusions.</strong> Even a comprehensive package will list exclusions. Ask for them in writing before you compare offers.</div>' +
      '<div class="blog-table-wrap"><table><thead><tr><th>Often outside the hospital estimate</th><th>Plan for it separately</th></tr></thead><tbody>' +
      '<tr><td>Visa fees and travel</td><td>Flights, medical visa fees, transit and local transport.</td></tr>' +
      '<tr><td>Accommodation and meals</td><td>Hotel or guesthouse for patient and attendant near the hospital.</td></tr>' +
      '<tr><td>Interpreter support</td><td>Professional interpretation for consent and discharge discussions.</td></tr>' +
      '<tr><td>Extended stay</td><td>Recovery days beyond the assumed length of stay, for the patient or companion.</td></tr>' +
      '<tr><td>Complications</td><td>Additional ICU, re-operation, medicines or tests if the plan changes.</td></tr>' +
      '<tr><td>Out-of-pocket medicines</td><td>High-cost or specialty medicines purchased separately.</td></tr>' +
      '</tbody></table></div>' +
      '<h2 id="assumptions">Assumptions that change the final bill</h2>' +
      '<p>Ask what the estimate assumes. The diagnosis and procedure, room category, expected length of stay, implant brand and type, medicine needs, and whether ICU is expected all move the figure. If additional tests change the diagnosis, or if the doctor adjusts the treatment after examination, the estimate will usually change too.</p>' +
      '<div class="blog-quick"><div><b>1</b>Ask what is included and excluded in writing.</div><div><b>2</b>Confirm the assumptions behind the number.</div><div><b>3</b>Plan separately for visa, travel and extended stay.</div></div>' +
      '<h2 id="questions">Questions to ask before paying</h2>' +
      '<ul class="blog-checklist"><li>Is this a package, an estimate or a deposit request?</li><li>Which diagnosis and procedure does the figure assume?</li><li>What exactly is excluded?</li><li>Is the implant or device included, and which brand or type?</li><li>How many hospital days are assumed, and what is the room category?</li><li>What happens if ICU care is needed?</li><li>What deposit is required, when, and how is it applied?</li><li>What is the cancellation and refund policy?</li></ul>' +
      '<h2 id="compare">Compare like for like</h2>' +
      '<p>A low figure can become expensive if major components are excluded. To compare two hospitals honestly, put the same procedure, room, stay, implant, inclusions and exclusions on both sides. Then compare clinical suitability, transparency and follow-up access as part of the value, not only the headline number.</p>' +
      '<h2 id="faq">Questions patients ask</h2><div class="blog-faq">' +
      "<details><summary>Can a hospital guarantee the final cost before I travel?</summary><p>Most hospitals will provide a written preliminary estimate, but the final cost can change after examination, updated tests, treatment changes, a longer stay, different implants or medicines, ICU use or complications. Ask for assumptions and exclusions in writing.</p></details>" +
      "<details><summary>What does a quote usually exclude?</summary><p>Visa fees, flights, transfers, accommodation, meals, interpreter support, extended stay and complications are commonly outside the hospital estimate. Confirm each exclusion in writing.</p></details>" +
      "<details><summary>Should I choose the cheapest estimate?</summary><p>Not automatically. Compare on identical inclusions and assumptions, and weigh clinical suitability, hospital capability, transparency and follow-up access. A low number that excludes major components is not the same offer.</p></details>" +
      "<details><summary>What deposit is normal?</summary><p>Deposit policies vary by hospital and treatment. Ask how much is required, when it is due, what it covers and the cancellation and refund policy — all in writing.</p></details>" +
      "</div>" +
      authorHtml +
      '<section class="blog-sources"><h2>Related reading on this site</h2><p>See our <a href="/cost/">treatment cost pages</a> and the <a href="/cost/what-is-included/">what is included in a treatment estimate</a> page for indicative ranges and categories. Prices vary by hospital and case.</p><p><strong>Medical disclaimer:</strong> This article provides general information only. Treatment costs and quotations should be confirmed in writing with the treating hospital.</p></section>',
  },

  {
    slug: "cardiac-review-preparation",
    category: "Heart health",
    eyebrow: "Heart health",
    h1: "Preparing for a Cardiac Specialist Review",
    deck: "Which reports, imaging and medication details help a cardiac team understand a case before you travel — and the questions that make the review useful.",
    date: "2026-08-10",
    read: 8,
    banner: { eyebrow: "Heart health", lines: ["Preparing for a Cardiac", "Specialist Review"] },
    toc: [
      { id: "history", label: "A current clinical history" },
      { id: "cardiac-file", label: "The cardiac file" },
      { id: "what-specialist-sees", label: "What the specialist looks for" },
      { id: "medicines", label: "Medicines and doses" },
      { id: "review-questions", label: "Questions to ask" },
      { id: "travel-safety", label: "Travel safety" },
      { id: "faq", label: "Questions patients ask" },
    ],
    body:
      '<p class="blog-lead">A cardiac review is only as useful as the information it receives. A written summary alone is rarely enough: cardiac decisions often depend on the actual ECG, echocardiogram, stress test and — where relevant — the angiogram images. Preparing the file carefully lets the specialist reach a more reliable opinion and helps you understand the options before you decide to travel.</p>' +
      '<div class="blog-warning"><strong>Do not travel for an unstable cardiac emergency.</strong> Sudden severe chest pain, breathlessness at rest, fainting, or symptoms that are clearly getting worse need immediate local medical attention. A cardiac review abroad is for planned care, not emergencies.</div>' +
      '<h2 id="history">Start with a current clinical history</h2>' +
      '<p>Write one page that the specialist can read quickly: the main cardiac diagnosis or question, when symptoms began, what the symptoms feel like and what makes them better or worse, previous heart events and procedures, current medicines with doses, other conditions, allergies, and the specific question you want answered.</p>' +
      '<h2 id="cardiac-file">Gather the complete cardiac file</h2>' +
      '<ul class="blog-checklist"><li>Past and recent ECGs (electrocardiograms) with the reports</li><li>Echocardiogram reports and, where possible, the videos or loop data</li><li>Stress test report and the exercise or imaging record</li><li>Angiography or CT coronary images and reports, in DICOM format where available</li><li>Cardiac device records (pacemaker or defibrillator) if relevant</li><li>Recent blood tests including cardiac enzymes and lipids, where done</li><li>Operation or procedure notes from previous cardiac treatment</li></ul>' +
      '<div class="blog-callout"><strong>Images, not only reports.</strong> Ask whether the actual imaging files can be shared securely. A specialist reviewing the DICOM images can assess anatomy and function directly rather than relying on a written interpretation.</div>' +
      '<h2 id="what-specialist-sees">What a cardiac specialist looks for</h2>' +
      '<div class="blog-table-wrap"><table><thead><tr><th>Investigation</th><th>What it shows</th><th>Why it matters</th></tr></thead><tbody>' +
      '<tr><td>ECG</td><td>Heart rhythm and electrical activity</td><td>Detects rhythm problems and changes suggesting ischaemia.</td></tr>' +
      '<tr><td>Echocardiogram</td><td>Structure and function of the heart</td><td>Assesses valve problems, wall motion and pumping function.</td></tr>' +
      '<tr><td>Stress test</td><td>How the heart responds to effort</td><td>Helps judge whether symptoms relate to reduced blood flow.</td></tr>' +
      '<tr><td>Angiography</td><td>The coronary anatomy itself</td><td>Shows where and how severely arteries narrow.</td></tr>' +
      '<tr><td>Blood tests</td><td>Lab markers relevant to the case</td><td>Supports diagnosis, risk and safety assessments.</td></tr>' +
      '</tbody></table></div>' +
      '<p>With this information the team can discuss whether you are more likely to benefit from medicines, a stent or surgery, and which tests to repeat in India. Their view at the start may remain provisional until there is an in-person examination.</p>' +
      '<h2 id="medicines">Medicines and doses</h2>' +
      '<p>Provide the exact list of medicines and doses, including blood thinners, in generic and brand names. Record recent medicine changes. Do not stop or adjust heart medicines on your own without instructions from a doctor who knows your case.</p>' +
      '<h2 id="review-questions">Questions to ask at the review</h2>' +
      '<ul class="blog-checklist"><li>What is the proposed diagnosis and what supports it?</li><li>Is treatment urgent, or can we complete planning safely first?</li><li>What are the treatment options and how does each compare?</li><li>Which key risks apply to my case and how are they managed?</li><li>What tests will be repeated in India and when?</li><li>What is the expected timeline from arrival to treatment?</li><li>How should I manage travel with my current heart condition?</li></ul>' +
      '<h2 id="travel-safety">Travel safety</h2>' +
      '<p>Confirm with the treating team whether the patient is fit to fly, whether oxygen or wheelchair assistance is needed at the airport, and how long the journey should be broken if necessary. Long flights raise questions of mobility, hydration and blood-clot risk. Return travel should start only after the doctor confirms fitness.</p>' +
      '<div class="blog-quick"><div><b>1</b>Send full records including images.</div><div><b>2</b>List medicines and doses exactly.</div><div><b>3</b>Confirm fitness to travel before booking.</div></div>' +
      '<h2 id="faq">Questions patients ask</h2><div class="blog-faq">' +
      "<details><summary>Can a cardiac review be done before I travel?</summary><p>Yes. Most cardiac teams can review records and, where appropriate, the imaging remotely and give a preliminary plan. An in-person examination is usually still needed before a final recommendation.</p></details>" +
      "<details><summary>Why does the doctor want the actual images?</summary><p>Because written reports summarise someone else's interpretation. The actual ECG, echo or angiogram data lets the specialist assess anatomy and function directly, which changes accuracy.</p></details>" +
      "<details><summary>Should I stop blood thinners before travelling?</summary><p>No. Medicines should be reviewed only by a doctor who knows your case. Stopping heart medicines without instruction can be dangerous. Ask the treating team at your review.</p></details>" +
      "<details><summary>How soon after cardiac treatment can I fly home?</summary><p>The safe timing depends on the procedure, your recovery, test results and the length of the journey. Confirm a realistic window with the treating doctor before booking return travel.</p></details>" +
      "</div>" +
      authorHtml +
      '<section class="blog-sources"><h2>Related reading on this site</h2><p>See our <a href="/treatments/heart/">heart treatment page</a> and the <a href="/conditions/coronary-artery-disease/">coronary artery disease guide</a> for background on common cardiac conditions and treatment in India.</p><p><strong>Medical disclaimer:</strong> This article provides general planning information only and does not recommend a treatment. Cardiac decisions must be made with your treating specialists.</p></section>',
  },

  {
    slug: "cancer-treatment-questions",
    category: "Cancer care",
    eyebrow: "Cancer care",
    h1: "Questions to Ask Before Cancer Treatment Abroad",
    deck: "A structured checklist covering diagnosis, staging, pathology review, treatment intent, expected side effects and follow-up — so you compare plans rather than prices.",
    date: "2026-08-06",
    read: 13,
    banner: { eyebrow: "Cancer care", lines: ["Questions to Ask Before", "Cancer Treatment Abroad"] },
    toc: [
      { id: "diagnosis-stage", label: "Diagnosis and staging" },
      { id: "intent", label: "Treatment intent" },
      { id: "who-plans", label: "Who plans the treatment" },
      { id: "modalities", label: "Treatment modalities" },
      { id: "side-effects", label: "Side effects and support" },
      { id: "second-opinion", label: "Second opinions and pathology" },
      { id: "costs", label: "Costs and trials" },
      { id: "follow-up", label: "Follow-up across borders" },
      { id: "faq", label: "Questions patients ask" },
    ],
    body:
      '<p class="blog-lead">Cancer treatment is rarely a single procedure; it is a sequence of decisions — diagnosis confirmation, staging, pathology review, treatment intent, a plan of surgery, medicines or radiation, side-effect management and follow-up. Before treatment abroad, the value is not in a quoted price but in how completely and honestly your case has been characterised and how clearly the plan is explained.</p>' +
      '<p>This article is a question checklist for international patients. It is not medical advice. Because cancer treatment is highly individual, every item below should be discussed with the treating specialists.</p>' +
      '<div class="blog-warning"><strong>Serious symptoms before treatment.</strong> If you develop severe new symptoms such as uncontrolled pain, bleeding, shortness of breath or worsening fever, seek urgent local medical care. Do not interrupt communication with your current doctors; treatment abroad is planning work, not an emergency bypass.</div>' +
      '<h2 id="diagnosis-stage">Confirm the diagnosis and the stage</h2>' +
      '<p>Begin by verifying what the cancer is called, where exactly it is, how far it has spread (the stage) and which features matter for treatment. Ask for the original pathology report and whether the biopsy slides or blocks can be re-reviewed by the Indian centre\'s pathologist.</p>' +
      '<ul class="blog-checklist"><li>What is the exact diagnosis, including the tissue type?</li><li>Which molecular or marker tests have been done and which results are pending?</li><li>What is the stage, and which scans were used to establish it?</li><li>Can my biopsy material be re-reviewed in India before treatment is fixed?</li></ul>' +
      '<h2 id="intent">Understand treatment intent</h2>' +
      '<p>Ask whether the plan aims to cure the cancer, to control it for as long as possible, or to relieve symptoms and improve quality of life. Intent changes the whole plan, the expectations, the length of treatment and the costs. Any team that cannot state a clear intent, or that promises a specific outcome, deserves caution — no honest team guarantees results.</p>' +
      '<h2 id="who-plans">Ask who plans the treatment</h2>' +
      '<p>Many cancers are best planned by a multidisciplinary team — surgeons, medical oncologists, radiation oncologists, pathologists and radiologists together. Ask who convenes your tumour board discussion, who is responsible for the overall plan, and who communicates it to you.</p>' +
      '<h2 id="modalities">Treatment modalities and timing</h2>' +
      '<div class="blog-table-wrap"><table><thead><tr><th>Component</th><th>Questions to ask</th></tr></thead><tbody>' +
      '<tr><td>Surgery</td><td>Is surgery part of the plan? Who performs it, and what is the aim?</td></tr>' +
      '<tr><td>Systemic therapy</td><td>Which medicines, for how long, by which route, and what monitoring is needed?</td></tr>' +
      '<tr><td>Radiotherapy</td><td>What plan, schedule and facilities (including modern techniques) are proposed?</td></tr>' +
      '<tr><td>Sequence</td><td>What comes first — medicine, surgery or radiation — and what is the expected timeline?</td></tr>' +
      '<tr><td>Trials</td><td>Are any clinical trials available for my situation, and what would participation involve?</td></tr>' +
      '</tbody></table></div>' +
      '<p>Ask for a written treatment schedule: how many cycles or sessions, the expected total timeframe, the tests along the way, and what determines whether the plan needs to change.</p>' +
      '<h2 id="side-effects">Side effects and supportive care</h2>' +
      '<p>Ask which side effects are expected, how they are managed, what to do at night or between appointments, and who is reachable when things do not go as expected. Find out whether nutrition support, pain management and blood-count monitoring are part of the package or are billed separately.</p>' +
      '<div class="blog-quick"><div><b>1</b>Confirm intent, sequence and timeline in writing.</div><div><b>2</b>Plan for side effects and the support that manages them.</div><div><b>3</b>Arrange follow-up with your home oncologist before you leave.</div></div>' +
      '<h2 id="second-opinion">Second opinions and pathology review</h2>' +
      '<p>For a major or uncertain plan, a second opinion is reasonable and often valuable. Provide identical records to each reviewer and compare their reasoning. Ask whether the Indian centre will re-review the biopsy and whether that changes the plan. A team that discourages a second opinion should be treated with caution.</p>' +
      '<h2 id="costs">Costs and clinical trials</h2>' +
      '<p>Cancer treatment costs are often high and quoted in phases rather than as one figure. Ask what each phase includes and excludes, what happens when the plan changes, and how medicines and supportive care are billed. If a trial is offered, ask the sponsor, what is covered free, what is charged, and what happens if the trial stops.</p>' +
      '<h2 id="follow-up">Follow-up across borders</h2>' +
      '<p>Before leaving, confirm the schedule of review scans, blood tests and consultations, and how results will reach the doctor caring for you at home. Agree who the contact is for questions and for urgent problems. Cancer follow-up continues after the journey ends, and that continuity protects the treatment already completed.</p>' +
      '<h2 id="faq">Questions patients ask</h2><div class="blog-faq">' +
      "<details><summary>Why do I need a pathology re-review in India?</summary><p>Because treatment depends on precise diagnosis and markers, and pathologists can differ. A re-review adds confidence that the diagnosis and subtype are correct before expensive or invasive treatment begins.</p></details>" +
      "<details><summary>Can my home oncologist continue treatment in India?</summary><p>Treatment in India is directed by the Indian treating team. Your home oncologist can provide records, advice and, after treatment, follow-up. Ask both teams how they intend to communicate before you travel.</p></details>" +
      "<details><summary>Should I worry if a team quotes a guarantee?</summary><p>Yes. No responsible medical team can guarantee a cure, a negative scan or a specific outcome. A guarantee is a serious red flag and inconsistent with honest cancer care.</p></details>" +
      "<details><summary>How do I pay for treatment in phases?</summary><p>Ask for a written phased estimate covering surgery, hospital stay, medicines and follow-up, with deposit and payment terms. Confirm what changes the plan and therefore the cost.</p></details>" +
      "</div>" +
      authorHtml +
      '<section class="blog-sources"><h2>Related reading on this site</h2><p>See our <a href="/treatments/cancer/">cancer treatment page</a> and condition guides such as <a href="/conditions/breast-cancer/">breast cancer</a> and <a href="/conditions/lung-cancer/">lung cancer</a> for background on care in India.</p><p><strong>Medical disclaimer:</strong> This article provides a general question checklist only. Cancer treatment must be planned and directed by qualified oncology specialists.</p></section>',
  },

  {
    slug: "joint-replacement-recovery",
    category: "Orthopaedics",
    eyebrow: "Orthopaedics",
    h1: "Planning Joint Replacement and Recovery",
    deck: "Key considerations around implants, the surgeon's experience, length of stay, rehabilitation, and fitness to fly when planning a joint replacement in India.",
    date: "2026-08-02",
    read: 10,
    banner: { eyebrow: "Orthopaedics", lines: ["Planning Joint Replacement", "and Recovery"] },
    toc: [
      { id: "confirm", label: "Confirm what is needed" },
      { id: "surgeon", label: "The surgeon and hospital" },
      { id: "implants", label: "Implants to ask about" },
      { id: "stay-recovery", label: "Length of stay and recovery" },
      { id: "rehab", label: "Rehabilitation plan" },
      { id: "travel", label: "Fitness to fly and travel" },
      { id: "costs", label: "Understanding the estimate" },
      { id: "faq", label: "Questions patients ask" },
    ],
    body:
      '<p class="blog-lead">A joint replacement is planned around three things: whether replacement is the right option, who performs it, and what happens afterwards — rehabilitation, travel and follow-up. Recovery continues long after the operation, so a good plan includes the weeks of physiotherapy and the return journey, not only the hospital stay.</p>' +
      '<p>This guide covers the practical planning questions for knee or hip replacement in India. It is general information and not a substitute for orthopaedic advice.</p>' +
      '<h2 id="confirm">Confirm what is needed before the date</h2>' +
      '<p>Start with imaging and the surgeon\u2019s opinion. X-rays, and in some cases MRI, establish the degree of arthritis or damage and whether replacement is appropriate or whether another procedure (such as arthroscopy, osteotomy or a partial replacement) may be more suitable. Ask whether this is a first or a revision replacement, since revision cases are more complex.</p>' +
      '<h2 id="surgeon">Choose the surgeon and hospital together</h2>' +
      '<p>Ask how many joint replacements the surgeon performs each year and how many of your type of case they manage. Confirm that the hospital provides physiotherapy, infection-control processes, an on-site blood bank and quick access to imaging and medical support. The rehabilitation floor and nursing care matter as much as the operating theatre.</p>' +
      '<div class="blog-callout"><strong>Ask about volume.</strong> Surgical volume is associated with experience for joint replacement. A surgeon who routinely manages your type of procedure can more reliably anticipate the routine and the complications.</div>' +
      '<h2 id="implants">Implants: what to ask about</h2>' +
      '<p>Implants are a major part of a knee or hip replacement. Ask which implant brand and type the estimate assumes, how it is matched to your bone, whether the hospital stocks the matching instruments, and whether the implant carries any registry or warranty documentation. Differences in implant cost explain part of the difference between quotations — compare the same implant when comparing prices.</p>' +
      '<h2 id="stay-recovery">Length of stay and recovery expectations</h2>' +
      '<div class="blog-table-wrap"><table><thead><tr><th>Phase</th><th>Typical expectation (varies by case)</th></tr></thead><tbody>' +
      '<tr><td>Hospital stay</td><td>Often a few days; walking with support usually starts early.</td></tr>' +
      '<tr><td>First weeks at home</td><td>Physiotherapy, pain control and prevention of complications.</td></tr>' +
      '<tr><td>Weeks to months</td><td>Progressive strength and mobility; return to most activities.</td></tr>' +
      '<tr><td>Full recovery</td><td>Can take several months; expectations should be individual.</td></tr>' +
      '</tbody></table></div>' +
      '<p>Ask the surgeon for a realistic range for your case, how the new joint is checked, and which warning signs mean you should seek urgent care (such as increased pain, swelling, fever or wound problems).</p>' +
      '<h2 id="rehab">Plan rehabilitation before the operation</h2>' +
      '<p>Recovery is driven by rehabilitation, not the operation alone. Ask who provides physiotherapy in hospital and after discharge, how many sessions are included, and whether the estimate covers rehabilitation. Arrange a practical space at home and a helper for the first weeks if you are travelling alone is not advisable after a replacement.</p>' +
      '<h2 id="travel">Fitness to fly and the journey home</h2>' +
      '<ul class="blog-checklist"><li>Ask the treating doctor how soon you may fly and what assistance is needed at the airport.</li><li>Plan for leg movement and, where advised, compression stockings to reduce blood-clot risk on long flights.</li><li>Confirm blood-thinning advice with the treating team before travel.</li><li>Book an aisle seat and request wheelchair assistance where appropriate.</li><li>On long journeys follow the team\u2019s advice on standing, walking and hydration.</li></ul>' +
      '<div class="blog-quick"><div><b>1</b>Match the surgeon\u2019s experience to your case.</div><div><b>2</b>Compare estimates on the same implant.</div><div><b>3</b>Plan rehabilitation and the return journey together.</div></div>' +
      '<h2 id="costs">Understand the estimate</h2>' +
      '<p>Ask what the replacement estimate includes: the implant itself, surgery and team fees, room and nursing for the assumed days, anaesthesia, standard medicines, physiotherapy, and scheduled follow-up. Confirm what is excluded and what happens if the stay is longer than expected. See our treatment estimate guide for a fuller checklist.</p>' +
      '<h2 id="faq">Questions patients ask</h2><div class="blog-faq">' +
      "<details><summary>How long do I stay in hospital after a joint replacement?</summary><p>It varies by the joint, the patient and the hospital, but often a few days with early mobilisation. Ask the surgeon for the range that applies to your case and what determines a shorter or longer stay.</p></details>" +
      "<details><summary>When can I fly home after surgery?</summary><p>Only after the doctor confirms fitness to travel. Timing depends on the procedure, healing, mobility and the length of the journey. Plan flexible travel and follow the team's blood-clot and mobility advice.</p></details>" +
      "<details><summary>Does the price include the implant?</summary><p>Not always. Some quotations exclude the implant or assume a specific brand. Always ask which implant the estimate assumes and compare like for like.</p></details>" +
      "<details><summary>How much rehabilitation will I need?</summary><p>Most patients need structured physiotherapy for weeks to months after a joint replacement. Ask what is included in the package, what is extra, and who supervises exercises once you are home.</p></details>" +
      "</div>" +
      authorHtml +
      '<section class="blog-sources"><h2>Related reading on this site</h2><p>See our <a href="/treatments/orthopaedics/">orthopaedics treatment page</a>, the <a href="/cost/joint-replacement/">joint replacement cost page</a> and condition guides such as <a href="/conditions/knee-osteoarthritis/">knee osteoarthritis</a> and <a href="/conditions/hip-osteoarthritis/">hip osteoarthritis</a>.</p><p><strong>Medical disclaimer:</strong> This article provides general planning information only. Surgical decisions and recovery expectations must be confirmed with your orthopaedic surgeon.</p></section>',
  },

  {
    slug: "recovery-sleep-nutrition",
    category: "Wellness",
    eyebrow: "Wellness",
    h1: "Supporting Recovery With Sleep and Nutrition",
    deck: "General wellbeing principles that may support recovery after treatment, always alongside the specific instructions of your treating team.",
    date: "2026-07-28",
    read: 7,
    banner: { eyebrow: "Wellness", lines: ["Supporting Recovery With", "Sleep and Nutrition"] },
    toc: [
      { id: "why", label: "Why rest matters" },
      { id: "sleep", label: "Practical sleep habits" },
      { id: "nutrition", label: "Nutrition during recovery" },
      { id: "energy", label: "Energy and gradual activity" },
      { id: "seek-help", label: "When to ask for help" },
      { id: "faq", label: "Questions patients ask" },
    ],
    body:
      '<p class="blog-lead">Sleep and food are ordinary parts of recovery that are easy to neglect after surgery or treatment abroad. General wellbeing principles — protecting sleep, staying adequately nourished and hydrated, and pacing activity — can support the body while it heals. They always work alongside, never instead of, the instructions of your treating team.</p>' +
      '<p>This article offers general guidance only. It is not medical or dietary advice for any specific condition, and the treating doctors or dietitians should always be followed for your individual recovery.</p>' +
      '<h2 id="why">Why rest matters during recovery</h2>' +
      '<p>Healing is physical work. Sleep and adequate nutrition give the body the time and material it needs to repair tissue, manage inflammation and fight infection. A long flight, a new time zone and a hospital environment can all disturb rest, so planning for sleep is practical, not optional.</p>' +
      '<h2 id="sleep">Practical sleep habits</h2>' +
      '<ul class="blog-checklist"><li>Keep a regular sleep window, even if your body clock is adjusting to a new time zone.</li><li>Reduce bright light and screens in the hour before bed; use blackout curtains or a sleep mask.</li><li>Ask the team how pain is controlled, because unmanaged pain prevents good sleep.</li><li>Limit long daytime naps if they stop you sleeping at night.</li><li>Limit caffeine late in the day and alcohol around sleep time unless the team advises otherwise.</li><li>If sleep disturbance continues, mention it to the medical team rather than self-medicating.</li></ul>' +
      '<h2 id="nutrition">Nutrition during recovery</h2>' +
      '<p>Ask your team what you may eat after surgery or treatment, because that varies by procedure. In general, balanced meals with adequate protein, fruits and vegetables, and enough fluids support healing. If appetite is poor, small frequent meals and easy-to-digest foods often help. If the team has prescribed dietary limits, follow those first.</p>' +
      '<div class="blog-callout"><strong>Food safety matters.</strong> Particularly after surgery, avoid food that may be unsafe to eat. Choose clean, freshly prepared food and confirmed drinking water. If you have dietary restrictions, tell the hospital and the hotel clearly.</div>' +
      '<h2 id="energy">Energy and gradual activity</h2>' +
      '<p>Movement after treatment is often guided precisely — walking distances, stair use, lifting limits, and rest windows. Follow those instructions and resume activity gradually. Recovery is not a race; overexertion can set back progress. Take breaks during the day, and spread activity so you can rest rather than collapsing at the end of it.</p>' +
      '<div class="blog-quick"><div><b>1</b>Protect sleep as part of healing.</div><div><b>2</b>Follow the team\u2019s food and fluid guidance.</div><div><b>3</b>Pace activity and rest gradually.</div></div>' +
      '<h2 id="seek-help">When to ask for help</h2>' +
      '<p>Recovery is not always linear. Ask for help if appetite loss persists, pain is difficult to control, sleep is badly disrupted for a long period, mood becomes hard to manage, or you feel noticeably unwell. These are normal things to raise with the medical team — they are not signs of failure, and they are often treatable.</p>' +
      '<h2 id="faq">Questions patients ask</h2><div class="blog-faq">' +
      "<details><summary>How much sleep do I need while recovering?</summary><p>Most people need more rest than usual after treatment. Follow your body and the team's activity guidance; if poor sleep persists, raise it with the medical team rather than relying on sleep aids independently.</p></details>" +
      "<details><summary>What should I eat after surgery?</summary><p>Follow your treating team\u2019s instructions first, since they vary by procedure. In general, balanced meals with adequate protein, moderate portions and good hydration support recovery, with small frequent meals if appetite is low.</p></details>" +
      "<details><summary>Can supplements speed up recovery?</summary><p>Do not take supplements without asking your doctors — some interact with medicines or affect blood clotting. Nutrition first; supplements, if any, only when the team approves them.</p></details>" +
      "<details><summary>Why does fatigue last so long after treatment abroad?</summary><p>Travel, hospital stays, surgery and disrupted sleep all add up. Fatigue can last longer than people expect. Gradually pace activity and rest, and raise persistent fatigue with the medical team.</p></details>" +
      "</div>" +
      authorHtml +
      '<section class="blog-sources"><h2>Related reading on this site</h2><p>See our <a href="/treatments/rehabilitation/">rehabilitation page</a> and the <a href="/how-it-works/">how it works</a> page for how follow-up care is organised.</p><p><strong>Medical disclaimer:</strong> This article provides general wellbeing information only, not medical or dietary advice. Always follow the instructions of your treating doctors and dietitians.</p></section>',
  },

  {
    slug: "medical-travel-red-flags",
    category: "Patient safety",
    eyebrow: "Patient safety",
    h1: "Red Flags in Medical Travel Claims",
    deck: "How to recognise guaranteed outcomes, unclear quotations and other claims that require caution when choosing medical treatment or a coordinator abroad.",
    date: "2026-07-24",
    read: 9,
    banner: { eyebrow: "Patient safety", lines: ["Red Flags in Medical", "Travel Claims"] },
    toc: [
      { id: "principle", label: "No outcome promises" },
      { id: "red-flags", label: "Red flags to notice" },
      { id: "verify", label: "Verify before you trust" },
      { id: "safe-questions", label: "Safe questions to ask" },
      { id: "report", label: "If something feels wrong" },
      { id: "faq", label: "Questions patients ask" },
    ],
    body:
      '<p class="blog-lead">Medical travel involves trusting people with both your money and your health. Most providers are honest, but the field attracts claims that deserve caution. This article lists the signs that should slow you down — guarantees, pressure, and unclear paperwork — and the checks that protect you before you commit.</p>' +
      '<h2 id="principle">The core principle: nobody can promise an outcome</h2>' +
      '<p>No honest medical team can guarantee a cure, a successful operation, a negative test or a specific result. Medicine deals in probabilities, informed consent and careful planning — never certainties. A claim that promises a result, or pressures you to decide immediately, is inconsistent with responsible care and should be treated as a red flag.</p>' +
      '<div class="blog-warning"><strong>Protect yourself.</strong> Never pay large deposits to an organisation you cannot verify. Legitimate providers give written proposals, identify their doctors and hospitals, and are comfortable with questions and second opinions.</div>' +
      '<h2 id="red-flags">Red flags to notice</h2>' +
      '<div class="blog-table-wrap"><table><thead><tr><th>Claim or behaviour</th><th>Why it is a concern</th></tr></thead><tbody>' +
      '<tr><td>Guaranteed outcome or \u201C100% success\u201D</td><td>Outcomes cannot be promised; such claims are not honest medicine.</td></tr>' +
      '<tr><td>Pressure to pay a deposit now</td><td>Urgency is a classic sign that the offer may not survive scrutiny.</td></tr>' +
      '<tr><td>Impossibly low fixed package</td><td>Prices that exclude major components are not the same offer.</td></tr>' +
      '<tr><td>No written plan or quote</td><td>Verbal offers cannot be compared, checked or relied on.</td></tr>' +
      '<tr><td>Doctor identity withheld</td><td>You should be able to verify the treating doctor and their registration.</td></tr>' +
      '<tr><td>Unverifiable accreditation</td><td>Claims about accreditation should be checkable at the specific location.</td></tr>' +
      '<tr><td>Medical advice without records</td><td>Advice given without reviewing your file is not a sound basis for travel.</td></tr>' +
      '<tr><td>Discourages questions or second opinions</td><td>Transparent teams welcome independent review.</td></tr>' +
      '</tbody></table></div>' +
      '<h2 id="verify">Verify before you trust</h2>' +
      '<ul class="blog-checklist"><li>Check the doctor\u2019s registration and the hospital\u2019s current accreditation at the specific location.</li><li>Contact the hospital independently using its own published contact details, not only a number you were given.</li><li>Ask for a written proposal: the plan, the estimate, inclusions, exclusions and timeline.</li><li>Confirm how the coordinator or agency is paid and whether any hospital relationship exists.</li><li>Get a second clinical opinion with the same records if the case is major.</li></ul>' +
      '<h2 id="safe-questions">Safe questions to ask</h2>' +
      '<div class="blog-quick"><div><b>1</b>Who exactly is treating me, and can I verify their registration?</div><div><b>2</b>What is included and excluded in this number?</div><div><b>3</b>Who is responsible if something changes after I arrive?</div></div>' +
      '<h2 id="report">If something feels wrong</h2>' +
      '<p>Trust the instinct. A legitimate hospital or coordinator will not disappear when you ask for documents, extra time or a second opinion. If you suspect a scam, stop payments, gather the correspondence and report it to the relevant authorities in your country and the appropriate Indian body (such as the police or, where applicable, the Indian mission). The F.I.R. route, consumer protection and platform reporting channels exist for a reason — use them.</p>' +
      '<h2 id="faq">Questions patients ask</h2><div class="blog-faq">' +
      "<details><summary>Is a low price always a scam?</summary><p>Not always, but a price far below comparable offers usually excludes major components or reflects unrealistic promises. Compare written quotes on identical inclusions before deciding what is genuine.</p></details>" +
      "<details><summary>Can I trust a coordinator who is pushy?</summary><p>Healthy providers allow time, questions and second opinions. Pressure to pay or decide quickly is a warning sign worth taking seriously.</p></details>" +
      "<details><summary>How do I check a hospital's accreditation?</summary><p>Ask for the specific location's current accreditation certificate and verify it with the issuing body (such as NABH or JCI). Confirm the branch you plan to use, not just the group name.</p></details>" +
      "<details><summary>What should I do if I suspect a scam?</summary><p>Stop payments, keep all correspondence, and report to the relevant authorities in your country and to the Indian police or the suitable consumer-protection and visa bodies. Do not let embarrassment stop you from reporting — it helps others too.</p></details>" +
      "</div>" +
      authorHtml +
      '<section class="blog-sources"><h2>Related reading on this site</h2><p>See our <a href="/how-we-select/">How TIB HIND selects hospitals</a>, the <a href="/how-we-are-paid/">how we are paid</a> page and the <a href="/medical-disclaimer/">medical disclaimer</a> for how provider claims are handled.</p><p><strong>Medical disclaimer:</strong> This article provides general patient-safety information only and does not diagnose or recommend specific providers.</p></section>',
  },
];

module.exports = { ARTICLES, WA_URL, ctaHtml };