import type React from "react";

export type BaseConfig = {
	title: string;
	baseUrl?: string;
	description?: string;
	author?: string;
};

export type Menu = {
	title: string;
	url: string;
	key?: string;
	isJump?: boolean;
	icon?: React.ReactNode;
	children?: Menu[];
};

export type Partner = {
	name: string;
	avatar?: string;
	url: string;
	desc: string;
};

export type Sample = {
	title: string;
	subtitle: string;
	image: string;
	url: string;
};

export type BlogConfig = {
	base: BaseConfig;
	menus: Menu[];
	social: {
		github: string;
		email: string;
	};
	partnerLinks: Partner[];
	samples: Sample[];
};
