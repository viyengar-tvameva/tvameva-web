'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { assessmentQuestions, dimensions, getMaturityLevel, type AssessmentDimension } from '@/data/assessment';
import { ArrowRight, ArrowLeft, CheckCircle, Lock } from 'lucide-react';

type Step = 'intro' | 'questions' | 'gate' | 'results';

interface Answers {
  [questionId: string]: number;
}

interface LeadInfo {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  title: string;
  companySize: string;
}

export default function AIMaturityAssessment() {
  const [step, setStep] = useState<Step>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [leadInfo, setLeadInfo] = useState<LeadInfo>({
    email: '', firstName: '', lastName: '', company: '', title: '', companySize: '',
  });

  const totalQuestions = assessmentQuestions.length;
  const progress = (Object.keys(answers).length / totalQuestions) * 100;

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (currentQuestion < totalQuestions - 1) {
      setTimeout(() => setCurrentQuestion((prev) => prev + 1), 300);
    }
  };

  const getDimensionScore = (dim: AssessmentDimension): number => {
    const dimQuestions = assessmentQuestions.filter((q) => q.dimension === dim);
    return dimQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
  };

  const getTotalScore = (): number => {
    return Object.values(answers).reduce((sum, val) => sum + val, 0);
  };

  const allAnswered = Object.keys(answers).length === totalQuestions;

  const handleSubmitGate = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to Drupal/CRM
    console.log('Lead captured:', { ...leadInfo, scores: answers, totalScore: getTotalScore() });
    setStep('results');
  };

  const currentQ = assessmentQuestions[currentQuestion];
  const currentDim = dimensions.find((d) => d.id === currentQ?.dimension);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        {/* Intro */}
        {step === 'intro' && (
          <section className="section-padding">
            <div className="section-container max-w-2xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-amber/10 border border-brand-amber/20 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse" />
                <span className="text-xs font-mono text-brand-amber tracking-wider uppercase">
                  5-minute assessment
                </span>
              </span>
              <h1 className="text-hero-md font-display font-bold text-white">
                AI Maturity Assessment
              </h1>
              <p className="mt-4 text-lg text-brand-gray-300 leading-relaxed">
                15 questions across 5 dimensions. Get a scored maturity level with
                personalized recommendations and suggested solution areas for your organization.
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-5 gap-3">
                {dimensions.map((dim) => (
                  <div key={dim.id} className="p-3 rounded-lg bg-brand-navy-card border border-brand-border/50 text-center">
                    <div className="text-xs font-display font-medium text-white">{dim.label}</div>
                    <div className="text-[10px] text-brand-gray-500 mt-1">{dim.description}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep('questions')}
                className="btn-primary mt-10 text-base px-10 py-4"
              >
                Start Assessment
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>

              <p className="mt-4 text-xs text-brand-gray-500">
                No commitment required. Results are free and immediate.
              </p>
            </div>
          </section>
        )}

        {/* Questions */}
        {step === 'questions' && currentQ && (
          <section className="section-padding">
            <div className="section-container max-w-2xl mx-auto">
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-brand-gray-500">
                    Question {currentQuestion + 1} of {totalQuestions}
                  </span>
                  <span className="text-xs font-mono text-brand-amber">
                    {currentDim?.label}
                  </span>
                </div>
                <div className="h-1 bg-brand-navy-surface rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-amber rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-xl font-display font-semibold text-white leading-snug">
                  {currentQ.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option) => {
                  const isSelected = answers[currentQ.id] === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(currentQ.id, option.value)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                        isSelected
                          ? 'border-brand-amber bg-brand-amber/10'
                          : 'border-brand-border hover:border-brand-border-light bg-brand-navy-card'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                            isSelected ? 'border-brand-amber bg-brand-amber' : 'border-brand-border-light'
                          }`}
                        >
                          {isSelected && <CheckCircle className="w-3 h-3 text-brand-navy" />}
                        </div>
                        <div>
                          <div className={`text-sm font-display font-medium ${isSelected ? 'text-brand-amber' : 'text-white'}`}>
                            {option.label}
                          </div>
                          <div className="text-xs text-brand-gray-400 mt-1">{option.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2 text-sm text-brand-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>

                {currentQuestion === totalQuestions - 1 && allAnswered ? (
                  <button onClick={() => setStep('gate')} className="btn-primary">
                    See My Results
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentQuestion((prev) => Math.min(totalQuestions - 1, prev + 1))}
                    disabled={!answers[currentQ.id]}
                    className="flex items-center gap-2 text-sm text-brand-amber hover:text-brand-amber-light disabled:opacity-30 transition-colors"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Email Gate */}
        {step === 'gate' && (
          <section className="section-padding">
            <div className="section-container max-w-lg mx-auto text-center">
              <Lock className="w-8 h-8 text-brand-amber mx-auto mb-4" />
              <h2 className="text-section-title font-display font-bold text-white">
                Your results are ready
              </h2>
              <p className="mt-3 text-brand-gray-300">
                Enter your details to unlock your full AI maturity report with
                personalized recommendations.
              </p>

              <form onSubmit={handleSubmitGate} className="mt-8 space-y-4 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-brand-gray-400 uppercase tracking-wider mb-1.5">First name</label>
                    <input
                      type="text"
                      required
                      value={leadInfo.firstName}
                      onChange={(e) => setLeadInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-brand-navy-surface border border-brand-border rounded-button text-sm text-white placeholder:text-brand-gray-600 focus:border-brand-amber focus:outline-none transition-colors"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-brand-gray-400 uppercase tracking-wider mb-1.5">Last name</label>
                    <input
                      type="text"
                      required
                      value={leadInfo.lastName}
                      onChange={(e) => setLeadInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-brand-navy-surface border border-brand-border rounded-button text-sm text-white placeholder:text-brand-gray-600 focus:border-brand-amber focus:outline-none transition-colors"
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-brand-gray-400 uppercase tracking-wider mb-1.5">Work email</label>
                  <input
                    type="email"
                    required
                    value={leadInfo.email}
                    onChange={(e) => setLeadInfo((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-brand-navy-surface border border-brand-border rounded-button text-sm text-white placeholder:text-brand-gray-600 focus:border-brand-amber focus:outline-none transition-colors"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-brand-gray-400 uppercase tracking-wider mb-1.5">Company</label>
                  <input
                    type="text"
                    required
                    value={leadInfo.company}
                    onChange={(e) => setLeadInfo((prev) => ({ ...prev, company: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-brand-navy-surface border border-brand-border rounded-button text-sm text-white placeholder:text-brand-gray-600 focus:border-brand-amber focus:outline-none transition-colors"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-brand-gray-400 uppercase tracking-wider mb-1.5">Title / Role</label>
                  <input
                    type="text"
                    required
                    value={leadInfo.title}
                    onChange={(e) => setLeadInfo((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-brand-navy-surface border border-brand-border rounded-button text-sm text-white placeholder:text-brand-gray-600 focus:border-brand-amber focus:outline-none transition-colors"
                    placeholder="VP Digital"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-brand-gray-400 uppercase tracking-wider mb-1.5">Company revenue</label>
                  <select
                    required
                    value={leadInfo.companySize}
                    onChange={(e) => setLeadInfo((prev) => ({ ...prev, companySize: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-brand-navy-surface border border-brand-border rounded-button text-sm text-white focus:border-brand-amber focus:outline-none transition-colors"
                  >
                    <option value="">Select range</option>
                    <option value="under-100m">Under $100M</option>
                    <option value="100m-500m">$100M – $500M</option>
                    <option value="500m-1b">$500M – $1B</option>
                    <option value="over-1b">Over $1B</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary w-full text-base py-3 mt-4">
                  Unlock My Results
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>

                <p className="text-[10px] text-brand-gray-600 text-center mt-2">
                  We respect your privacy. Your data is used only to deliver your assessment results
                  and relevant follow-up.
                </p>
              </form>
            </div>
          </section>
        )}

        {/* Results */}
        {step === 'results' && (
          <section className="section-padding">
            <div className="section-container max-w-3xl mx-auto">
              {(() => {
                const totalScore = getTotalScore();
                const maturity = getMaturityLevel(totalScore);
                return (
                  <>
                    {/* Overall Score */}
                    <div className="text-center mb-12">
                      <h1 className="text-section-title font-display font-bold text-white mb-2">
                        Your AI Maturity Score
                      </h1>
                      <div className="mt-6">
                        <span className="text-6xl font-display font-bold" style={{ color: maturity.color }}>
                          {totalScore}
                        </span>
                        <span className="text-2xl text-brand-gray-400 font-display"> / 60</span>
                      </div>
                      <div
                        className="mt-3 inline-flex items-center px-4 py-1.5 rounded-full text-sm font-display font-semibold"
                        style={{ backgroundColor: `${maturity.color}20`, color: maturity.color }}
                      >
                        {maturity.label}
                      </div>
                      <p className="mt-4 text-brand-gray-300 max-w-lg mx-auto leading-relaxed">
                        {maturity.description}
                      </p>
                    </div>

                    {/* Dimension Breakdown */}
                    <div className="space-y-4 mb-12">
                      <h2 className="text-lg font-display font-semibold text-white">
                        Dimension breakdown
                      </h2>
                      {dimensions.map((dim) => {
                        const score = getDimensionScore(dim.id);
                        const maxScore = 12; // 3 questions × 4 max
                        const pct = (score / maxScore) * 100;
                        return (
                          <div key={dim.id} className="card p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-display font-medium text-white">{dim.label}</span>
                              <span className="text-sm font-mono text-brand-amber">{score}/{maxScore}</span>
                            </div>
                            <div className="h-2 bg-brand-navy-surface rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width: `${pct}%`,
                                  backgroundColor: pct > 75 ? '#2ed8a3' : pct > 50 ? '#f5a623' : '#e8593c',
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* CTA */}
                    <div className="text-center p-8 rounded-2xl border border-brand-amber/20 bg-gradient-to-br from-brand-amber/5 to-transparent">
                      <h2 className="text-lg font-display font-bold text-white mb-2">
                        Want a deeper assessment?
                      </h2>
                      <p className="text-sm text-brand-gray-300 mb-6 max-w-md mx-auto">
                        Our advisory team can run a comprehensive evaluation with your leadership—benchmarked
                        against industry peers, with a prioritized roadmap and business case.
                      </p>
                      <a href="/contact" className="btn-primary">
                        Schedule an Advisory Call
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </div>
                  </>
                );
              })()}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
