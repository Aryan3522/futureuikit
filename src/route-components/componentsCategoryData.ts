import CompsButtons from"@/components/CompsButtons";
import CompsCards from"@/components/CompsCards";
import CompsTypography from"@/components/CompsTypography";
import CompsLoaders from"@/components/CompsLoaders";
import CompsCarousels from"@/components/CompsCarousels";
import CompsNavigation from"@/components/CompsNavigation";
import CompsFeedback from"@/components/CompsFeedback";
import CompsUI from"@/components/CompsUI";
import { ComponentCategoryItem } from"@/types";

export const compsCategory: ComponentCategoryItem[] = [
 {
 label:"Buttons",
 slug:"buttons",
 component: CompsButtons,
 },
 {
 label:"Cards",
 slug:"cards",
 component: CompsCards,
 },
 {
 label:"Typography",
 slug:"typography",
 component: CompsTypography,
 },
 {
 label:"Loaders",
 slug:"loaders",
 component: CompsLoaders,
 },
 {
 label:"Carousels",
 slug:"carousels",
 component: CompsCarousels,
 },
 {
 label:"Navigation",
 slug:"menu",
 component: CompsNavigation,
 },
 {
 label:"Feedback",
 slug:"feedback",
 component: CompsFeedback,
 },
 {
 label:"UI Components",
 slug:"ui",
 component: CompsUI,
 },
];
