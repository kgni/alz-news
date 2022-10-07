import InfoPageLayout from '../../components/UI/Layout/InfoPageLayout';
import Head from 'next/head';
export default function Page({}) {
	return (
		<>
			<Head>
				<title>Dementia - What Is Dementia?</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<article className="leading-relaxed text-lg">
				<div className="mb-16">
					<h1 className="text-center text-5xl font-bold leading-normal">
						What Is Dementia?
					</h1>
					<span className="block italic text-center">
						Source:{' '}
						<a
							className="underline hover:text-gray-500 "
							target="_blank"
							href="https://www.alz.org/alzheimers-dementia/what-is-dementia"
						>
							alz.org
						</a>
					</span>
				</div>
				<p className="mb-8">
					Dementia is a general term for loss of memory, language,
					problem-solving and other thinking abilities that are severe enough to
					interfere with daily life. Alzheimer's is the most common cause of
					dementia.
				</p>
				<section className="mb-12">
					<h2 className="text-3xl font-bold mb-4">About dementia</h2>
					<p
						className="mb-6
				"
					>
						Dementia is not a single disease; it’s an overall term — like heart
						disease — that covers a wide range of specific medical conditions,
						including Alzheimer’s disease. Disorders grouped under the general
						term “dementia” are caused by abnormal brain changes. These changes
						trigger a decline in thinking skills, also known as cognitive
						abilities, severe enough to impair daily life and independent
						function. They also affect behavior, feelings and relationships.
					</p>
					<p className="mb-6">
						Alzheimer's disease accounts for 60-80% of cases. Vascular dementia,
						which occurs because of microscopic bleeding and blood vessel
						blockage in the brain, is the second most common cause of dementia.
						Those who experience the brain changes of multiple types of dementia
						simultaneously have mixed dementia. There are many other conditions
						that can cause symptoms of dementia, including some that are
						reversible, such as thyroid problems and vitamin deficiencies.
					</p>
					<p className="">
						Dementia is often incorrectly referred to as "senility" or "senile
						dementia," which reflects the formerly widespread but incorrect
						belief that serious mental decline is a normal part of aging.
					</p>
				</section>
				<section className="mb-6">
					<h2 className="text-3xl font-bold mb-4">
						Symptoms and signs of dementia
					</h2>
					<p className="mb-6">
						Signs of dementia can vary greatly. Examples include problems with:
					</p>
					<ul className="list-disc mb-6 pl-12 flex flex-col gap-4">
						<li>Short-term memory.</li>
						<li>Keeping track of a purse or wallet.</li>
						<li>Paying bills.</li>
						<li>Planning and preparing meals.</li>
						<li>Remembering appointments.</li>
						<li>Traveling out of the neighborhood.</li>
					</ul>
					<p className="">
						Many conditions are progressive, which means that the signs of
						dementia start out slowly and gradually get worse. If you or someone
						you know is experiencing memory difficulties or other changes in
						thinking skills, don't ignore them. See a doctor soon to determine
						the cause. Professional evaluation may detect a treatable condition.
						And even if symptoms suggest dementia, early diagnosis allows a
						person to get the maximum benefit from available treatments and
						provides an opportunity to volunteer for clinical trials or studies.
						It also provides time to plan for the future.
					</p>
				</section>
				<section className="mb-12">
					<h2 className="text-3xl font-bold mb-4">Causes</h2>
					<p className="mb-6">
						Dementia is caused by damage to brain cells. This damage interferes
						with the ability of brain cells to communicate with each other. When
						brain cells cannot communicate normally, thinking, behavior and
						feelings can be affected.
					</p>
					<p className="mb-6">
						The brain has many distinct regions, each of which is responsible
						for different functions (for example, memory, judgment and
						movement). When cells in a particular region are damaged, that
						region cannot carry out its functions normally.
					</p>
					<p className="mb-6">
						Different types of dementia are associated with particular types of
						brain cell damage in particular regions of the brain. For example,
						in Alzheimer's disease, high levels of certain proteins inside and
						outside brain cells make it hard for brain cells to stay healthy and
						to communicate with each other. The brain region called the
						hippocampus is the center of learning and memory in the brain, and
						the brain cells in this region are often the first to be damaged.
						That's why memory loss is often one of the earliest symptoms of
						Alzheimer's.
					</p>
					<p className="mb-6">
						While most changes in the brain that cause dementia are permanent
						and worsen over time, thinking and memory problems caused by the
						following conditions may improve when the condition is treated or
						addressed:
					</p>
					<ul className="list-disc pl-12 flex flex-col gap-4">
						<li>Depression.</li>
						<li>Medication side effects.</li>
						<li>Excess use of alcohol.</li>
						<li>Thyroid problems.</li>
						<li>Vitamin deficiencies.</li>
					</ul>
				</section>
				<section className="mb-12">
					<h2 className="text-3xl font-bold mb-4">Diagnosis of dementia</h2>
					<p className="">
						There is no one test to determine if someone has dementia. Doctors
						diagnose Alzheimer's and other types of dementia based on a careful
						medical history, a physical examination, laboratory tests, and the
						characteristic changes in thinking, day-to-day function and behavior
						associated with each type. Doctors can determine that a person has
						dementia with a high level of certainty. But it's harder to
						determine the exact type of dementia because the symptoms and brain
						changes of different dementias can overlap. In some cases, a doctor
						may diagnose "dementia" and not specify a type. If this occurs, it
						may be necessary to see a specialist such as a neurologist,
						psychiatrist, psychologist or geriatrician.
					</p>
				</section>
				<section className="mb-12">
					<h2 className="text-3xl font-bold mb-4">
						Dementia treatment and care
					</h2>
					<p className="mb-6">
						Treatment of dementia depends on its cause. In the case of most
						progressive dementias, including Alzheimer's disease, there is no
						cure, but one treatment — aducanumab (Aduhelm™) — is the first
						therapy to demonstrate that removing amyloid, one of the hallmarks
						of Alzheimer’s disease, from the brain is reasonably likely to
						reduce cognitive and functional decline in people living with early
						Alzheimer’s. Others can temporarily slow the worsening of dementia
						symptoms and improve quality of life for those living with
						Alzheimer's and their caregivers. The same medications used to treat
						Alzheimer's are among the drugs sometimes prescribed to help with
						symptoms of other types of dementias. Non-drug therapies can also
						alleviate some symptoms of dementia.
					</p>
					<p className="">
						Ultimately, the path to effective new treatments for dementia is
						through increased research funding and increased participation in
						clinical studies. Right now, volunteers are urgently needed to
						participate in clinical studies and trials about Alzheimer's and
						other dementias.
					</p>
				</section>
				<section className="mb-12">
					<h2 className="text-3xl font-bold mb-4">
						Dementia risk and prevention
					</h2>
					<p className="mb-6">
						Some risk factors for dementia, such as age and genetics, cannot be
						changed. But researchers continue to explore the impact of other
						risk factors on brain health and prevention of dementia
					</p>
					<p className="mb-6">
						Research reported at the 2019 Alzheimer’s Association International
						Conference® suggests that adopting multiple healthy lifestyle
						choices, including healthy diet, not smoking, regular exercise and
						cognitive stimulation, may decrease the risk of cognitive decline
						and dementia.
					</p>

					<span className="block italic">
						Source:{' '}
						<a
							className="underline hover:text-gray-500 "
							target="_blank"
							href="https://www.alz.org/alzheimers-dementia/what-is-dementia"
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
