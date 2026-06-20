# Student Success And Official Feature Design

## Goal

Add two distinct experience surfaces to the portfolio so recruiters can quickly distinguish formal student employment from official recognition by the undergraduate institution.

## Scope

Insert the new content after the education cards and before the project experience section. Keep the existing black-and-gold system, responsive behavior, DotGrid background boundary, and motion language.

## Student Success Work Experience

- Organisation: University of Tasmania.
- Role: Student Success Leader - Chinese Outreach.
- Period: 2022.
- Location: Sandy Bay campus.
- Public responsibilities:
  - Proactively welcome and contact students identified as needing additional support.
  - Refer students to study progression, employment, internship, and campus support resources.
  - Provide Chinese outreach and cross-cultural student support.
- Exclude confidential offer details including remuneration, manager identity, internal eligibility requirements, and contract terms.

The card uses the University of Tasmania gold lion mark on a black-and-gold grid. It is a work-experience card, not an analytics project card.

## Official Feature Banner

- Source: Southwest University Westa College official WeChat public-account article.
- Article title: "海外学子风采｜姚羿：为明天谱写新的可能".
- Intent: present formal institutional recognition of undergraduate academic performance, leadership, international study path, and model-student role.
- Copy focus: School Principal Incentive Award, First Prize; 2+2 international pathway; student organisation and coordination experience; overseas postgraduate admissions.
- Interaction: the full banner opens `https://mp.weixin.qq.com/s/hgu61u2-5xiz6NrdqE1w3Q` in a new tab. An external-link arrow indicates the behavior.
- Visual hierarchy:
  - Eyebrow: `OFFICIAL FEATURE / 西南大学西塔学院`.
  - Title: article title.
  - Supporting copy: official feature positioning, not duplicated work experience.
  - Tags: `校长激励奖一等奖`, `2+2 国际培养`, `学生组织与协作`, `海外升学`.

The banner is wider and more visually prominent than a normal experience card so the official endorsement is immediately legible.

## Interaction And Responsive Requirements

- Use the existing GSAP section entrance pattern; title enters first, then content elements stagger in.
- Respect `prefers-reduced-motion` and preserve static readability without JavaScript animation.
- The Student Success card and official feature banner stack on mobile.
- The official link must use `target="_blank"` and `rel="noreferrer"`.
- Do not add either surface to the contact section or change existing project cards.

## Validation

- Extend content checks to assert the Student Success role, 2022 period, official article title, and WeChat source URL.
- Confirm production build and the existing content/performance checks pass.
