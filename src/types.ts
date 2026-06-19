export interface Scenario {
  scenarioType: string;
  hook: string;
  hookB: string;
  visualInstructions: string;
  audioScript: string;
  callToAction: string;
  callToActionB: string;
  caption: string;
  captionB: string;
  viralPotentialScore: number;
  hookStrength: number;
  ctaClarity: number;
  visualEngagement: number;
}

export interface GenerationResponse {
  scenarios: Scenario[];
}

export interface ExampleConfig {
  title: string;
  productName: string;
  targetAudience: string;
  competitiveAdvantage: string;
}
