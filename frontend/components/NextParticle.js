import React, { createRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { NextParticle as NP } from '../nextparticle.js';

let np;

export const NextParticle = (settings) => {
	const wrapperRef = createRef();

	const spawnNextParticle = () => {
		np = new NP({ ...settings, wrapperElement: wrapperRef.current });
		if (!np.events.stopped) {
			np.on('stopped', function (obj) {
				this.canvas.remove();
			});
		}
	};

	useEffect(() => {
		if (np) {
			np.events.imageLoaded = [];
			np.stop();
		}
		spawnNextParticle();
	});

	return <div ref={wrapperRef} className={settings.className}></div>;
};

export default NextParticle;
