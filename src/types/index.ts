export interface ComponentCode {
 next?: string;
 react?: string;
 html?: string;
 css?: string;
}

export interface ComponentItem {
 id: number;
 title: string;
 type: string;
 slug: string;
 category: string;
 isNew?: boolean;
 heroImage?: string;
 previewImage?: string;
 previewVideo?: string;
 description: string;
 details: string[];
 codes: ComponentCode;
 usage: string[];
}

export interface RegistryFile {
 name: string;
 content: string;
 targetPath?: string;
}

export interface RegistryItem {
 name: string;
 type: string;
 description?: string;
 category?: string;
 tags?: string[];
 typeLabel?: string;
 details?: string[];
 usage?: string[];
 codeNext?: string;
 isNew?: boolean;
 dependencies?: string[];
 files: RegistryFile[];
}

export interface Registry {
 [key: string]: RegistryItem;
}

export interface ComponentCategoryItem {
 label: string;
 slug: string;
 component: React.ComponentType;
}
