import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Consent() {
    const navigate = useNavigate();
    const [aiAnalysis, setAiAnalysis] = useState(true);
    const [reports, setReports] = useState(true);
    const [notifications, setNotifications] = useState(true);

    const handleConfirm = () => {
        // TODO: Save consent preferences to Supabase user metadata
        navigate('/onboarding');
    };

    const handleDecline = () => {
        setReports(false);
        setNotifications(false);
        navigate('/onboarding');
    };

    return (
        <div className="bg-background-dark font-display antialiased text-[#FCFCFC] min-h-screen">
            <div className="relative flex h-screen w-full max-w-[430px] mx-auto flex-col bg-background-dark p-6 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <button onClick={() => navigate(-1)} className="text-[#FCFCFC] hover:opacity-80 transition-opacity active:scale-95">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-bold flex-1 text-center pr-6 text-[#FCFCFC]">Consentimento</h1>
                </div>

                {/* Icon & Description */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-primary text-5xl transition-all" style={{ fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
                    </div>
                    <p className="text-center text-lg font-medium leading-relaxed px-2">
                        Para oferecer a melhor experiência com nossa <span className="text-primary font-bold">IA</span>, precisamos do seu consentimento para analisar seus <span className="text-primary font-bold">padrões financeiros</span>.
                    </p>
                </div>

                {/* Consent Toggles */}
                <div className="flex flex-col gap-4 mb-10">
                    {/* AI Analysis */}
                    <div className="bg-[#0D0E10] p-5 rounded-2xl flex items-center justify-between border border-[#FCFCFC]/5 shadow-xl">
                        <div className="flex flex-col gap-1">
                            <h3 className="font-bold text-[#FCFCFC]">Análise de Gastos pela IA</h3>
                            <p className="text-xs text-[#A7A7A7]">Insights personalizados sobre suas finanças.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={aiAnalysis}
                                onChange={(e) => setAiAnalysis(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>

                    {/* Reports */}
                    <div className="bg-[#0D0E10] p-5 rounded-2xl flex items-center justify-between border border-[#FCFCFC]/5 shadow-xl">
                        <div className="flex flex-col gap-1">
                            <h3 className="font-bold text-[#FCFCFC] text-sm">Compartilhamento para Relatórios</h3>
                            <p className="text-xs text-[#A7A7A7]">Envio de extratos consolidados por e-mail.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={reports}
                                onChange={(e) => setReports(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>

                    {/* Notifications */}
                    <div className="bg-[#0D0E10] p-5 rounded-2xl flex items-center justify-between border border-[#FCFCFC]/5 shadow-xl">
                        <div className="flex flex-col gap-1">
                            <h3 className="font-bold text-[#FCFCFC]">Comunicações e Alertas</h3>
                            <p className="text-xs text-[#A7A7A7]">Notificações importantes sobre sua conta.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={notifications}
                                onChange={(e) => setNotifications(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-auto flex flex-col gap-6 items-center pb-4">
                    <button
                        onClick={handleConfirm}
                        className="w-full bg-primary hover:brightness-110 active:scale-[0.98] text-black font-extrabold py-5 rounded-2xl transition-all uppercase tracking-wider text-sm shadow-lg shadow-primary/20"
                    >
                        Confirmar e Continuar
                    </button>
                    <button
                        onClick={handleDecline}
                        className="text-[#A7A7A7] hover:text-[#FCFCFC] text-sm font-medium transition-colors"
                    >
                        Recusar Opcionais
                    </button>
                </div>

                {/* Decorative Elements */}
                <div className="fixed top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
                <div className="fixed bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            </div>
        </div>
    );
}
