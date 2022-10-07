import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../Nav/Footer';
import Header from '../../Nav/Header';
import SideBarNavAlzheimers from '../../Nav/SideBarNavAlzheimers';
const InfoPageLayout = ({ containerWidth = 'max-w-[100ch]', children }) => {
	const router = useRouter();
	console.log(`containerWidth: ${containerWidth}`);
	console.log(router.pathname);

	// section classes: flex grow pt-8 (to style sidebar and make it fill screen vertically)
	return (
		<>
			<div className="overflow-x-hidden min-h-screen flex flex-col">
				<div className="grow flex flex-col max-w-[1600px] mx-auto pb-8 w-[90%]">
					<Header />
					<section className="py-12">
						{/* <SideBarNavAlzheimers path={router.pathname} /> */}
						<div className={` ${containerWidth} mx-auto`}>{children}</div>
					</section>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default InfoPageLayout;
