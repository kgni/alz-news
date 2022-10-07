import InfoPageLayout from '../../components/UI/Layout/InfoPageLayout';
import Head from 'next/head';
import useMediaQuery from '../../hooks/useMediaQuery';
export default function Page({}) {
	const isHeadingBreaking = useMediaQuery('(max-width: 560px');

	return (
		<>
			<Head>
				<title>Alzheimers - What Is Alzheimers?</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<article className="leading-relaxed text-md">
				<div className="mb-16">
					<h1 className="text-center text-5xl font-bold leading-normal md:text-4xl md:mb-2">
						What is {isHeadingBreaking && <br />} Alzheimer’s Disease?
					</h1>
					<span className="block italic text-center">
						Source:{' '}
						<a
							className="underline hover:text-gray-500 "
							target="_blank"
							href="https://www.alz.org/alzheimers-dementia/what-is-alzheimers"
						>
							alz.org
						</a>
					</span>
				</div>
				<p className="mb-8">
					Alzheimer's is a type of dementia that affects memory, thinking and
					behavior. Symptoms eventually grow severe enough to interfere with
					daily tasks.
				</p>
				<section className="mb-12">
					<h2 className="text-3xl font-bold mb-4 md:text-2xl">
						Understanding Alzheimer's and dementia
					</h2>
					<p
						className="mb-6
				"
					>
						<strong>Alzheimer's is the most common cause of dementia</strong>, a
						general term for memory loss and other cognitive abilities serious
						enough to interfere with daily life. Alzheimer's disease accounts
						for 60-80% of dementia cases.
					</p>
					<p className="mb-6">
						<strong>Alzheimer's is not a normal part of aging.</strong> The
						greatest known risk factor is increasing age, and the majority of
						people with Alzheimer's are 65 and older. Alzheimer’s disease is
						considered to be younger-onset Alzheimer’s if it affects a person
						under 65. Younger-onset can also be referred to as early-onset
						Alzheimer’s. People with younger-onset Alzheimer’s can be in the
						early, middle or late stage of the disease.
					</p>
					<p className="mb-6">
						<strong>Alzheimer's worsens over time.</strong> Alzheimer's is a
						progressive disease, where dementia symptoms gradually worsen over a
						number of years. In its early stages, memory loss is mild, but with
						late-stage Alzheimer's, individuals lose the ability to carry on a
						conversation and respond to their environment. On average, a person
						with Alzheimer's lives 4 to 8 years after diagnosis but can live as
						long as 20 years, depending on other factors.
					</p>
					<p>
						<strong>Alzheimer's has no cure, but one treatment</strong> —
						<a
							className="underline hover:text-gray-500"
							href="https://www.alz.org/alzheimers-dementia/treatments/aducanumab?_ga=2.146167728.529418738.1665093075-1492968886.1664121483&_gl=1*1nu19ud*_ga*MTQ5Mjk2ODg4Ni4xNjY0MTIxNDgz*_ga_QSFTKCEH7C*MTY2NTA5MzA3NC44LjEuMTY2NTA5MzgzNi4wLjAuMA..*_ga_9JTEWVX24V*MTY2NTA5MzA3NC43LjEuMTY2NTA5MzgzNi41My4wLjA."
						>
							{' '}
							aducanumab (Aduhelm™)
						</a>{' '}
						— is the first therapy to demonstrate that removing amyloid, one of
						the hallmarks of Alzheimer’s disease, from the brain is reasonably
						likely to reduce cognitive and functional decline in people living
						with early Alzheimer’s. Other treatments can temporarily slow the
						worsening of dementia symptoms and improve quality of life for those
						with Alzheimer's and their caregivers. Today, there is a worldwide
						effort underway to find better ways to treat the disease, delay its
						onset and prevent it from developing.
					</p>
				</section>
				<section className="mb-12">
					<h2 className="text-3xl font-bold mb-4 md:text-2xl">
						Symptoms of Alzheimer's
					</h2>
					<p className="mb-6">
						The most common early symptom of Alzheimer's is difficulty
						remembering newly learned information.
					</p>
					<p className="mb-6">
						Just like the rest of our bodies, our brains change as we age. Most
						of us eventually notice some slowed thinking and occasional problems
						with remembering certain things. However, serious memory loss,
						confusion and other major changes in the way our minds work may be a
						sign that brain cells are failing.
					</p>
					<p className="mb-6">
						Alzheimer's changes typically begin in the part of the brain that
						affects learning. As Alzheimer's advances through the brain it leads
						to increasingly severe symptoms, including disorientation, mood and
						behavior changes; deepening confusion about events, time and place;
						unfounded suspicions about family, friends and professional
						caregivers; more serious memory loss and behavior changes; and
						difficulty speaking, swallowing and walking.
					</p>
					<p>
						People with memory loss or other possible signs of Alzheimer’s may
						find it hard to recognize they have a problem. Signs of dementia may
						be more obvious to family members or friends. Anyone experiencing
						dementia-like symptoms should see a doctor as soon as possible. If
						you need assistance finding a doctor with experience evaluating
						memory problems, your local Alzheimer's Association can help.
						<br />
						Earlier diagnosis and intervention methods are improving
						dramatically, and treatment options and sources of support can
						improve quality of life. Two helpful support resources you can tap
						into are ALZConnected, our message boards and online social
						networking community, and Alzheimer's Navigator, a web tool that
						creates customized action plans, based on answers you provide
						through short, online surveys.
					</p>
				</section>
				<section className="mb-12">
					<h2 className="text-3xl font-bold mb-4 md:text-2xl">
						Alzheimer's and the brain
					</h2>
					<p className="mb-6">
						Microscopic changes in the brain begin long before the first signs
						of memory loss.
					</p>
					<p className="mb-6">
						The brain has 100 billion nerve cells (neurons). Each nerve cell
						connects with many others to form communication networks. Groups of
						nerve cells have special jobs. Some are involved in thinking,
						learning and remembering. Others help us see, hear and smell.
					</p>
					<p className="mb-6">
						To do their work, brain cells operate like tiny factories. They
						receive supplies, generate energy, construct equipment and get rid
						of waste. Cells also process and store information and communicate
						with other cells. Keeping everything running requires coordination
						as well as large amounts of fuel and oxygen.
					</p>
					<p>
						Scientists believe Alzheimer's disease prevents parts of a cell's
						factory from running well. They are not sure where the trouble
						starts. But just like a real factory, backups and breakdowns in one
						system cause problems in other areas. As damage spreads, cells lose
						their ability to do their jobs and, eventually die, causing
						irreversible changes in the brain.
					</p>
				</section>
				<section className="mb-12">
					<h2 className="text-3xl font-bold mb-4 md:text-2xl">
						The role of plaques and tangles
					</h2>
					<p className="mb-6">
						Two abnormal structures called plaques and tangles are prime
						suspects in damaging and killing nerve cells.
					</p>
					<ol className="list-decimal pl-12 mb-6">
						<li className="mb-3">
							Plaques are deposits of a protein fragment called beta-amyloid
							(BAY-tuh AM-uh-loyd) that build up in the spaces between nerve
							cells.
						</li>
						<li>
							Tangles are twisted fibers of another protein called tau (rhymes
							with “wow”) that build up inside cells.
						</li>
					</ol>
					<p className="mb-6">
						Though autopsy studies show that most people develop some plaques
						and tangles as they age, those with Alzheimer’s tend to develop far
						more and in a predictable pattern, beginning in the areas important
						for memory before spreading to other regions.
					</p>
					<p className="mb-6">
						Scientists do not know exactly what role plaques and tangles play in
						Alzheimer's disease. Most experts believe they somehow play a
						critical role in blocking communication among nerve cells and
						disrupting processes that cells need to survive.
					</p>
					<p>
						It's the destruction and death of nerve cells that causes memory
						failure, personality changes, problems carrying out daily activities
						and other symptoms of Alzheimer's disease.
					</p>
				</section>
				<section className=" md:mb-0">
					<h2 className="text-3xl font-bold mb-4 md:text-2xl">
						Research and progress
					</h2>
					<p className="mb-6">
						In 1906, German physician Dr. Alois Alzheimer first described "a
						peculiar disease" — one of profound memory loss and microscopic
						brain changes — a disease we now know as Alzheimer's.
					</p>
					<p className="mb-6">
						Today, Alzheimer's is at the forefront of biomedical research.
						Researchers are working to uncover as many aspects of Alzheimer's
						disease and other dementias as possible. Some of the most remarkable
						progress has shed light on how Alzheimer's affects the brain. The
						hope is this better understanding will lead to new treatments. Many
						potential approaches are currently under investigation worldwide.
						Sign up for our weekly E-News to receive updates about Alzheimer’s
						and dementia care and research.
					</p>

					<span className="block italic">
						Source:{' '}
						<a
							className="underline hover:text-gray-500 "
							target="_blank"
							href="https://www.alz.org/alzheimers-dementia/what-is-alzheimers"
						>
							alz.org
						</a>
					</span>
				</section>
			</article>
		</>
	);
}

Page.getLayout = function getLayout(page) {
	return <InfoPageLayout>{page}</InfoPageLayout>;
};
