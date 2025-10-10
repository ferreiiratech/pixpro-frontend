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
