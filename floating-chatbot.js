// Floating AI Chatbot - Can be included on any page
class FloatingChatbot {
    constructor() {
        this.isOpen = false;
        this.chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        this.createChatbot();
        this.setupEventListeners();
        this.loadChatHistory();
    }

    createChatbot() {
        // Create chatbot container
        const chatbotHTML = `
            <div id="floating-chatbot" style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">
                <!-- Chat Toggle Button -->
                <div id="chat-toggle" style="
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                    transition: all 0.3s ease;
                    color: white;
                    font-size: 24px;
                ">
                    🤖
                </div>

                <!-- Chat Window -->
                <div id="chat-window" style="
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 350px;
                    height: 500px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                    border: 1px solid #e0e0e0;
                ">
                    <!-- Chat Header -->
                    <div style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 15px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    ">
                        <div>
                            <div style="font-weight: bold; font-size: 16px;">🤖 AI Strategy Assistant</div>
                            <div style="font-size: 12px; opacity: 0.9;">Product Strategy Expert</div>
                        </div>
                        <div id="chat-close" style="
                            cursor: pointer;
                            font-size: 20px;
                            opacity: 0.8;
                            transition: opacity 0.2s;
                        ">×</div>
                    </div>

                    <!-- Chat Messages -->
                    <div id="chat-messages" style="
                        flex: 1;
                        padding: 15px;
                        overflow-y: auto;
                        background: #f8f9fa;
                    ">
                        <div style="
                            margin-bottom: 15px;
                            padding: 12px;
                            background: #e3f2fd;
                            border-radius: 8px;
                            border-left: 4px solid #2196f3;
                            font-size: 14px;
                            line-height: 1.4;
                        ">
                            <strong>🤖 AI Assistant:</strong><br><br>
                            Hello! I'm your Product Strategy AI with expertise in:<br><br>
                            📊 Conversion optimization<br>
                            🎯 User journey mapping<br>
                            🚀 Feature prioritization<br>
                            📈 Growth strategies<br>
                            💰 Pricing optimization<br><br>
                            What challenge can I help you solve today?
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div style="
                        padding: 10px 15px;
                        background: white;
                        border-top: 1px solid #e0e0e0;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 8px;
                    ">
                        <button onclick="floatingChatbot.quickQuestion('How can I improve conversion?')" style="
                            padding: 6px 8px;
                            background: #f0f8ff;
                            border: 1px solid #ddd;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 11px;
                            transition: background 0.2s;
                        ">💡 Improve Conversion</button>
                        <button onclick="floatingChatbot.quickQuestion('What features to prioritize?')" style="
                            padding: 6px 8px;
                            background: #f0f8ff;
                            border: 1px solid #ddd;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 11px;
                            transition: background 0.2s;
                        ">🎯 Feature Priority</button>
                        <button onclick="floatingChatbot.quickQuestion('How to analyze competition?')" style="
                            padding: 6px 8px;
                            background: #f0f8ff;
                            border: 1px solid #ddd;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 11px;
                            transition: background 0.2s;
                        ">🔍 Market Analysis</button>
                        <button onclick="floatingChatbot.quickQuestion('What pricing strategy?')" style="
                            padding: 6px 8px;
                            background: #f0f8ff;
                            border: 1px solid #ddd;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 11px;
                            transition: background 0.2s;
                        ">💰 Pricing Strategy</button>
                    </div>

                    <!-- Chat Input -->
                    <div style="
                        padding: 15px;
                        background: white;
                        border-top: 1px solid #e0e0e0;
                        display: flex;
                        gap: 10px;
                    ">
                        <input type="text" id="chat-input" placeholder="Ask about strategy, features, growth..." style="
                            flex: 1;
                            padding: 10px;
                            border: 1px solid #ddd;
                            border-radius: 6px;
                            font-size: 14px;
                            outline: none;
                        ">
                        <button id="chat-send" style="
                            padding: 10px 15px;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            border: none;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 14px;
                            transition: opacity 0.2s;
                        ">Send</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    setupEventListeners() {
        const toggle = document.getElementById('chat-toggle');
        const close = document.getElementById('chat-close');
        const send = document.getElementById('chat-send');
        const input = document.getElementById('chat-input');

        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.closeChat());
        send.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Hover effects
        toggle.addEventListener('mouseenter', () => {
            toggle.style.transform = 'scale(1.1)';
        });
        toggle.addEventListener('mouseleave', () => {
            toggle.style.transform = 'scale(1)';
        });
    }

    toggleChat() {
        const window = document.getElementById('chat-window');
        const toggle = document.getElementById('chat-toggle');
        
        if (this.isOpen) {
            this.closeChat();
        } else {
            window.style.display = 'flex';
            window.style.animation = 'slideUp 0.3s ease';
            toggle.innerHTML = '✕';
            this.isOpen = true;
        }
    }

    closeChat() {
        const window = document.getElementById('chat-window');
        const toggle = document.getElementById('chat-toggle');
        
        window.style.display = 'none';
        toggle.innerHTML = '🤖';
        this.isOpen = false;
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const messages = document.getElementById('chat-messages');
        const userMessage = input.value.trim();
        
        if (userMessage) {
            this.chatHistory.push({type: 'user', content: userMessage});
            this.saveChatHistory();
            
            // Add user message
            messages.innerHTML += `
                <div style="
                    margin: 10px 0;
                    padding: 10px;
                    background: white;
                    border-radius: 8px;
                    text-align: right;
                    border: 1px solid #e0e0e0;
                    font-size: 14px;
                ">
                    <strong>You:</strong> ${userMessage}
                </div>
            `;
            
            // Show typing indicator
            this.showTypingIndicator();
            
            // Get AI response
            setTimeout(() => {
                this.removeTypingIndicator();
                const response = this.getIntelligentResponse(userMessage.toLowerCase());
                
                this.chatHistory.push({type: 'ai', content: response.answer, suggestions: response.suggestions});
                this.saveChatHistory();
                
                messages.innerHTML += `
                    <div style="
                        margin: 10px 0;
                        padding: 15px;
                        background: #e8f5e8;
                        border-radius: 8px;
                        border-left: 4px solid #4caf50;
                        font-size: 14px;
                        line-height: 1.4;
                    ">
                        <strong>🤖 AI Assistant:</strong><br><br>${response.answer.replace(/\\n/g, '<br>')}
                        ${response.suggestions ? `<div style="margin-top: 15px; padding: 12px; background: rgba(255,255,255,0.8); border-radius: 6px; border: 1px solid #ddd; font-size: 13px;"><strong>💡 Try asking:</strong><br>${response.suggestions}</div>` : ''}
                    </div>
                `;
                
                messages.scrollTop = messages.scrollHeight;
            }, 1000);
            
            input.value = '';
            messages.scrollTop = messages.scrollHeight;
        }
    }

    quickQuestion(question) {
        document.getElementById('chat-input').value = question;
        this.sendMessage();
    }

    showTypingIndicator() {
        const messages = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.style.cssText = `
            margin: 10px 0;
            padding: 10px;
            background: #f0f0f0;
            border-radius: 8px;
            font-style: italic;
            color: #666;
            font-size: 14px;
        `;
        typingDiv.innerHTML = '🤖 AI is thinking...';
        messages.appendChild(typingDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    getIntelligentResponse(userMessage) {
        // Comprehensive AI knowledge base
        const responses = {
            // Greetings
            greeting: {
                keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
                answer: `Hello! I'm your AI Product Strategy Assistant.\\n\\nI can help you with:\\n📊 Conversion optimization\\n🎯 User journey mapping\\n🚀 Feature prioritization\\n📈 Growth strategies\\n💰 Pricing optimization\\n\\nWhat specific challenge are you facing?`,
                suggestions: "• How can I improve my conversion rate?<br>• What features should I prioritize?<br>• How do I analyze my competition?"
            },
            
            // Conversion & CTA
            conversion: {
                keywords: ['conversion', 'cta', 'sign up', 'signup', 'button', 'convert', 'rate'],
                answer: `🎯 **Conversion Optimization Strategy**\\n\\n✅ **CTA Optimization:**\\n• Use action-oriented copy: "Start Free Trial" vs "Sign Up"\\n• Place CTAs above fold + at natural break points\\n• Use contrasting colors (orange/green = 32% better than blue)\\n\\n📈 **Social Proof & Urgency:**\\n• Add urgency: "Limited Time Offer"\\n• Include social proof: "Join 10,000+ users"\\n• Display real-time signups or usage stats\\n\\n📝 **Form Optimization:**\\n• Reduce fields to essentials only\\n• Use progressive disclosure\\n• Add field validation with helpful errors\\n\\n💡 **Quick Win:** A/B test your main CTA button - even small changes can boost conversions by 20-40%!`,
                suggestions: "• What colors work best for CTA buttons?<br>• How can I reduce signup friction?<br>• Should I use social proof on my landing page?"
            },
            
            // User Journey & UX
            userjourney: {
                keywords: ['user journey', 'ux', 'experience', 'flow', 'onboarding', 'retention'],
                answer: `🗺️ **User Journey Optimization**\\n\\n🎯 **Key Journey Stages:**\\n\\n1️⃣ **Discovery**\\n   • SEO content marketing\\n   • Targeted ads & referrals\\n   • Social media presence\\n\\n2️⃣ **Evaluation**\\n   • High-converting landing pages\\n   • Interactive demos & trials\\n   • Case studies & testimonials\\n\\n3️⃣ **Onboarding**\\n   • Progressive disclosure of features\\n   • Quick wins within first session\\n   • Guided tutorials & tooltips\\n\\n4️⃣ **Activation**\\n   • Aha moments within 5 minutes\\n   • Clear value demonstration\\n   • Milestone celebrations\\n\\n5️⃣ **Retention**\\n   • Email nurture sequences\\n   • In-app guidance & tips\\n   • Regular feature updates\\n\\n📊 **Key Stat:** Users who complete onboarding have 67% higher retention!`,
                suggestions: "• How do I reduce onboarding drop-off?<br>• What metrics should I track for user experience?<br>• How can I improve user retention?"
            },
            
            // Features & Prioritization
            features: {
                keywords: ['feature', 'prioritize', 'roadmap', 'development', 'mvp', 'backlog'],
                answer: `🚀 **Feature Prioritization Framework**\\n\\n📊 **RICE Scoring Method:**\\n• **Reach:** How many users affected?\\n• **Impact:** How much will it improve their experience?\\n• **Confidence:** How sure are you about the estimates?\\n• **Effort:** How much work is required?\\n\\n**Formula:** (Reach × Impact × Confidence) ÷ Effort\\n\\n🎯 **High-Impact Feature Categories:**\\n\\n1️⃣ **Core Workflow Improvements** (40%)\\n   • Streamline main user tasks\\n   • Reduce clicks & friction\\n\\n2️⃣ **Integration Capabilities** (30%)\\n   • Connect with popular tools\\n   • API & webhook support\\n\\n3️⃣ **Mobile Optimization** (20%)\\n   • Responsive design\\n   • Native app features\\n\\n4️⃣ **Advanced Analytics** (10%)\\n   • Custom dashboards\\n   • Reporting & insights\\n\\n✅ **Best Practice:** 70% core features, 20% growth experiments, 10% technical debt`,
                suggestions: "• How do I validate feature ideas?<br>• What's the best MVP approach?<br>• Should I build or buy this feature?"
            },
            
            // Market Analysis
            market: {
                keywords: ['market', 'competition', 'competitor', 'analysis', 'research', 'industry'],
                answer: `📊 **Market Analysis Strategy**\\n\\n🔍 **Competitor Research:**\\n\\n1️⃣ **Identify Competitors**\\n   • Direct: Same solution, same market\\n   • Indirect: Different solution, same problem\\n   • Tools: SimilarWeb, Ahrefs, SEMrush\\n\\n2️⃣ **Analyze Key Areas**\\n   • Pricing models & strategies\\n   • Feature sets & positioning\\n   • Marketing channels & messaging\\n   • Customer reviews & complaints\\n\\n3️⃣ **Find Market Gaps**\\n   • Conduct customer interviews\\n   • Analyze competitor reviews\\n   • Survey target audience\\n\\n📈 **Key Metrics to Track:**\\n• Market size & growth rate\\n• Customer acquisition costs\\n• Average deal sizes\\n• Churn rates by segment\\n\\n💡 **Strategy:** Focus on differentiation rather than feature parity. Find your unique value proposition!`,
                suggestions: "• Who are my main competitors?<br>• How should I price my product?<br>• What's my competitive advantage?"
            },
            
            // Growth & Metrics
            growth: {
                keywords: ['growth', 'metrics', 'kpi', 'analytics', 'revenue', 'arr', 'mrr'],
                answer: `📈 **Growth Metrics Framework**\\n\\n🎯 **North Star Metric:**\\nChoose ONE metric that best represents user value\\n\\n📊 **AARRR Funnel:**\\n\\n🔸 **Acquisition:** How do users find you?\\n   • Traffic sources, conversion rates\\n   • Cost per acquisition (CPA)\\n\\n🔸 **Activation:** Do they experience value?\\n   • Time to first value < 24 hours\\n   • Onboarding completion rates\\n\\n🔸 **Retention:** Do they come back?\\n   • Day 1, 7, 30 retention rates\\n   • Cohort analysis\\n\\n🔸 **Revenue:** Do they pay?\\n   • MRR growth > 10% monthly\\n   • LTV:CAC ratio > 3:1\\n\\n🔸 **Referral:** Do they tell others?\\n   • NPS score > 50\\n   • Viral coefficient\\n\\n⚡ **SaaS Benchmarks:**\\n• Monthly churn < 5%\\n• Annual churn < 10%\\n• Gross revenue retention > 90%`,
                suggestions: "• What's a good conversion rate for my industry?<br>• How do I calculate customer lifetime value?<br>• Which metrics matter most for SaaS?"
            },
            
            // Pricing Strategy
            pricing: {
                keywords: ['pricing', 'price', 'cost', 'subscription', 'freemium', 'plan'],
                answer: `💰 **Pricing Strategy Framework**\\n\\n🎯 **Pricing Models:**\\n\\n1️⃣ **Value-Based Pricing**\\n   • Align with customer ROI\\n   • Price based on outcomes delivered\\n   • Premium for high-value segments\\n\\n2️⃣ **Freemium Strategy**\\n   • Free tier for viral growth\\n   • Clear upgrade triggers\\n   • Limit usage, not features\\n\\n3️⃣ **Tiered Pricing (Good-Better-Best)**\\n   • 3-4 clear tiers maximum\\n   • Most customers choose middle tier\\n   • Enterprise tier with custom pricing\\n\\n💡 **Optimization Tips:**\\n\\n✅ **Annual Discounts:** 15-20% off\\n✅ **A/B Testing:** Test pricing regularly\\n✅ **Price Increases:** 10-15% annually\\n✅ **Grandfathering:** Protect existing customers\\n\\n📊 **Monitor These Metrics:**\\n• Price sensitivity by segment\\n• Upgrade/downgrade rates\\n• Churn by pricing tier\\n• Revenue per customer`,
                suggestions: "• Should I offer a free plan?<br>• How many pricing tiers should I have?<br>• When should I raise prices?"
            },
            
            // AI & Technology
            ai: {
                keywords: ['ai', 'artificial intelligence', 'automation', 'machine learning', 'technology'],
                answer: `🤖 **AI Implementation Strategy**\\n\\n🚀 **Implementation Roadmap:**\\n\\n1️⃣ **Start Simple**\\n   • Rule-based systems first\\n   • Automate repetitive tasks\\n   • Collect data for ML models\\n\\n2️⃣ **Add Intelligence**\\n   • Recommendation engines\\n   • Predictive analytics\\n   • Natural language processing\\n\\n3️⃣ **Advanced AI**\\n   • Machine learning models\\n   • Computer vision\\n   • Generative AI features\\n\\n🎯 **Focus Areas:**\\n\\n✅ **User Problems to Solve:**\\n• Personalized recommendations\\n• Automated workflows\\n• Intelligent insights\\n• Content generation\\n\\n🛠️ **Popular Tech Stack:**\\n• **Backend:** Python, TensorFlow, PyTorch\\n• **APIs:** OpenAI, AWS Bedrock, Google AI\\n• **Infrastructure:** AWS, GCP, Azure\\n• **Real-time:** WebSockets, Redis\\n\\n⚠️ **Best Practices:**\\n• Ensure data quality & privacy\\n• Gradual rollout with human oversight\\n• Measure AI impact on core metrics\\n• Maintain explainable AI for trust`,
                suggestions: "• How can AI improve my product?<br>• What data do I need for AI features?<br>• Should I build or use AI APIs?"
            },
            
            // Default/Help
            help: {
                keywords: ['help', 'what can you do', 'capabilities', 'assist', 'support'],
                answer: `I can help you with:\\n\\n📊 Conversion optimization & A/B testing\\n🎯 User journey mapping & UX improvements\\n🚀 Feature prioritization & roadmap planning\\n📈 Growth strategies & metrics analysis\\n💰 Pricing strategies & revenue optimization\\n🤖 AI implementation & automation\\n🔍 Market research & competitive analysis\\n📋 PRD creation & product strategy\\n\\nWhat specific challenge would you like to tackle?`,
                suggestions: "• How do I improve my conversion rate?<br>• What features should I build next?<br>• How do I analyze my competition?"
            }
        };
        
        // Find matching response
        for (const [category, data] of Object.entries(responses)) {
            if (data.keywords.some(keyword => userMessage.includes(keyword))) {
                return data;
            }
        }
        
        // Default response with suggestions
        return {
            answer: `🤔 **Great Question!**\\n\\nI specialize in product strategy and can help you with:\\n\\n📊 Conversion optimization & A/B testing\\n🎯 User journey mapping & UX improvements\\n🚀 Feature prioritization & roadmap planning\\n📈 Growth strategies & metrics analysis\\n💰 Pricing strategies & revenue optimization\\n🤖 AI implementation & automation\\n🔍 Market research & competitive analysis\\n\\nWhat specific challenge would you like to tackle first?`,
            suggestions: "• How can I improve my product's conversion rate?<br>• What features should I prioritize next?<br>• How do I analyze my market competition?<br>• What metrics should I track for growth?"
        };
    }
    
    saveChatHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
    }
    
    loadChatHistory() {
        const messages = document.getElementById('chat-messages');
        if (this.chatHistory.length > 0) {
            messages.innerHTML = '';
            this.chatHistory.forEach(msg => {
                if (msg.type === 'user') {
                    messages.innerHTML += `
                        <div style="
                            margin: 10px 0;
                            padding: 10px;
                            background: white;
                            border-radius: 8px;
                            text-align: right;
                            border: 1px solid #e0e0e0;
                            font-size: 14px;
                        ">
                            <strong>You:</strong> ${msg.content}
                        </div>
                    `;
                } else {
                    messages.innerHTML += `
                        <div style="
                            margin: 10px 0;
                            padding: 15px;
                            background: #e8f5e8;
                            border-radius: 8px;
                            border-left: 4px solid #4caf50;
                            font-size: 14px;
                            line-height: 1.4;
                        ">
                            <strong>🤖 AI Assistant:</strong><br><br>${msg.content.replace(/\\n/g, '<br>')}
                            ${msg.suggestions ? `<div style="margin-top: 15px; padding: 12px; background: rgba(255,255,255,0.8); border-radius: 6px; border: 1px solid #ddd; font-size: 13px;"><strong>💡 Try asking:</strong><br>${msg.suggestions}</div>` : ''}
                        </div>
                    `;
                }
            });
            messages.scrollTop = messages.scrollHeight;
        }
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    #floating-chatbot button:hover {
        background: #e3f2fd !important;
        transform: translateY(-1px);
    }
    
    #chat-send:hover {
        opacity: 0.9 !important;
        background: linear-gradient(135deg, #5a6fd8 0%, #6a4c93 100%) !important;
    }
    
    #chat-close:hover {
        opacity: 1 !important;
    }
`;
document.head.appendChild(style);

// Initialize the floating chatbot
const floatingChatbot = new FloatingChatbot();