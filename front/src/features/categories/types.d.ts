export interface CategoryType {
  id: number;
  title: string;
  subCategories: SubCategoryType[];
}

export interface SubCategoryType {
  id: number;
  title: string;
  mainCategory: CategoryType;
}

export interface SubCategoryMutation {
  mainCategory: string;
  subCategoryTitle: string;
}