type CardFeatureProps = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

interface PricingCardProps {
  title: string;
  description: string;
  price?: number;
  isCustom?: boolean;
  priceDescription: string;
  buttonText: string;
  buttonHref: string;
  buttonVariant?: "default" | "outline";
  isPopular?: boolean;
  features: string[];
  featuresTitle: string;
}

type LoginCredentials = {
  email: string;
  password: string;
};

type SignupCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

type SignupResponse = {
  name: string;
  email: string;
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

interface OnboardingState {
  isActive: boolean;
  currentStep: number;
  isCompleted: boolean;
}

type ImageDto = {
  id: string;
  url: string;
  fileKey: string;
  contentType: string;
  projectId: string;
  createdAt: string;
};

type RequestUploadUrlDto = {
  projectId: string;
  contentType: string;
};

type UploadUrlDto = {
  uploadUrl: string;
  fileKey: string;
};

type ConfirmUploadDto = {
  fileKey: string;
  projectId: string;
  contentType: string;
};

type SingleFileDto = {
  contentType: string;
};

type BatchRequestUploadUrlDto = {
  projectId: string;
  files: SingleFileDto[];
};

type SingleUploadDto = {
  fileKey: string;
  contentType: string;
};

type BatchConfirmUploadDto = {
  projectId: string;
  uploads: SingleUploadDto[];
};

type AuthState = {
  isAuthenticated: boolean;
  logout: () => void;
};

interface TourStep {
  target: string;
  title: string;
  description: string;
  placement?: "top" | "bottom" | "left" | "right";
}

interface ProductTourProps {
  steps: TourStep[];
  onComplete?: () => void;
  onSkip?: () => void;
}

interface ProjectTheme {
  id: string;
  name: string;
  description: string;
  icon: string;
  options?: {
    id: string;
    name: string;
    description?: string;
    value?: string;
  }[];
}

interface Project {
  id: string;
  name: string;
  description?: string;
  theme?: string;
  themeOption?: string;
  imageCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CreateProjectData {
  name: string;
  description?: string;
  theme: string;
  themeOption?: string;
}

interface ProjectPageProps {
  params: {
    id: string;
  };
}

type OnboardingStore = {
  hasCompletedOnboarding: boolean;
  setOnboardingCompleted: (value: boolean) => void;
  markOnboardingCompleted: () => void;
  clearOnboarding: () => void;
};

type StoredProject = {
  id?: string;
  name?: string;
  imageCount?: number;
  description?: string;
};

type ProjectImage = {
  id: string;
  fileKey: string;
  status: string;
  contentType: string;
  projectId: string;
  userId: string;
};

type Job = {
  id: string;
  status: string;
  modelType: string | null;
  parameters: Record<string, unknown>;
  targetImageIds: string[];
  resultImageUrls: string[];
  createdAt: string;
  updatedAt: string;
};

type ProjectDetail = {
  id: string;
  name: string;
  description?: string;
  userId: string;
  images: ProjectImage[];
  jobs: Job[];
  numberOfImages: number;
  numberOfProcessedImages: number;
  numberOfPendingImages: number;
};
