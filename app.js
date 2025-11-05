// ===== State Management =====
let campaigns = [];
let currentCampaign = null;

// ===== Initialize App =====
document.addEventListener('DOMContentLoaded', () => {
    loadCampaigns();
    displayCampaigns();
    updateGlobalStats();
    setupFormListeners();
});

// ===== Sample Data =====
function getDefaultCampaigns() {
    return [
        {
            id: '1',
            title: 'Fund Universal Pre-K in Our State',
            category: 'education',
            description: 'Every child deserves access to quality early education. Universal Pre-K has been proven to improve educational outcomes, reduce achievement gaps, and support working families. Let\'s make this a reality in our state.',
            message: 'Dear Representative,\n\nI am writing to urge you to support funding for universal Pre-K in our state. Research consistently shows that early childhood education is one of the best investments we can make in our children\'s future and our economy.\n\nUniversal Pre-K would:\n- Give every child a strong start\n- Support working families\n- Reduce long-term education costs\n- Boost our state\'s economy\n\nI urge you to prioritize this issue and vote yes on universal Pre-K funding.\n\nThank you for your consideration.',
            target: 'state',
            actions: 1247,
            recentActions: 23,
            created: '2025-10-15'
        },
        {
            id: '2',
            title: 'Expand Rural Broadband Access',
            category: 'infrastructure',
            description: 'Millions of Americans lack access to reliable high-speed internet. In 2025, internet access is not a luxury—it\'s essential for education, healthcare, business, and civic participation. We need federal investment in rural broadband infrastructure.',
            message: 'Dear Representative,\n\nI am writing to ask for your support in expanding broadband infrastructure to underserved rural areas. The digital divide is real and growing, leaving rural communities behind.\n\nReliable internet access is essential for:\n- Remote work and economic opportunity\n- Online education and telehealth\n- Small business growth\n- Emergency services\n\nPlease support legislation that funds rural broadband expansion and ensures every American has access to high-speed internet.\n\nThank you.',
            target: 'federal',
            actions: 3421,
            recentActions: 187,
            created: '2025-10-20'
        },
        {
            id: '3',
            title: 'Protect Local Green Spaces',
            category: 'environment',
            description: 'Our community\'s parks and green spaces are under threat from commercial development. These spaces provide clean air, recreation, wildlife habitat, and community gathering places. We must protect them for current and future generations.',
            message: 'Dear Representative,\n\nI am writing to express my strong opposition to plans that would reduce our local green spaces and parks for commercial development.\n\nThese spaces are vital because they:\n- Provide clean air and improve public health\n- Offer recreational opportunities for all residents\n- Support local wildlife and biodiversity\n- Strengthen community bonds\n\nI urge you to oppose any measures that would compromise our green spaces and instead support their expansion and protection.\n\nThank you for representing our community\'s interests.',
            target: 'local',
            actions: 892,
            recentActions: 5,
            created: '2025-10-25'
        },
        {
            id: '4',
            title: 'Support Mental Health Services in Schools',
            category: 'healthcare',
            description: 'Student mental health is in crisis. Our schools need adequate funding for counselors, social workers, and mental health programs. Every student should have access to support when they need it most.',
            message: 'Dear Representative,\n\nI am writing to urge you to increase funding for mental health services in our schools. The mental health crisis among young people is well-documented, but our schools lack the resources to provide adequate support.\n\nWe need:\n- More school counselors and social workers\n- Mental health screening and early intervention programs\n- Training for teachers to recognize warning signs\n- Reduced stigma around seeking help\n\nOur children\'s wellbeing must be a top priority. Please support increased funding for school mental health services.\n\nThank you.',
            target: 'state',
            actions: 2156,
            recentActions: 89,
            created: '2025-10-28'
        },
        {
            id: '5',
            title: 'Make Housing More Affordable',
            category: 'housing',
            description: 'Housing costs are skyrocketing while wages stagnate. Families are being priced out of their communities. We need comprehensive housing policy that includes rent control, affordable housing development, and protections for renters.',
            message: 'Dear Representative,\n\nI am writing about the urgent housing affordability crisis in our community. Too many families are struggling to keep a roof over their heads as rents and home prices become increasingly unaffordable.\n\nWe need action on:\n- Rent stabilization and tenant protections\n- Funding for affordable housing construction\n- Zoning reform to allow more housing\n- First-time homebuyer assistance programs\n\nHousing is a human right. Please prioritize policies that make housing affordable for all residents.\n\nThank you.',
            target: 'all',
            actions: 4782,
            recentActions: 312,
            created: '2025-10-30'
        },
        {
            id: '6',
            title: 'Increase Teacher Pay',
            category: 'education',
            description: 'Teachers are leaving the profession due to low pay and burnout. We\'re facing a teacher shortage that threatens our children\'s education. Competitive salaries are essential to attract and retain quality educators.',
            message: 'Dear Representative,\n\nI am writing to urge you to support increased funding for teacher salaries. Our state is experiencing a teacher shortage, and low pay is a major factor driving educators out of the profession.\n\nCompetitive teacher salaries will:\n- Attract talented individuals to teaching\n- Reduce turnover and improve student outcomes\n- Show we value education\n- Ensure every classroom has a qualified teacher\n\nOur children deserve the best teachers, and teachers deserve compensation that reflects their vital role in society.\n\nThank you for your consideration.',
            target: 'state',
            actions: 1834,
            recentActions: 42,
            created: '2025-11-01'
        }
    ];
}

// ===== Local Storage Functions =====
function loadCampaigns() {
    const stored = localStorage.getItem('campaigns');
    if (stored) {
        campaigns = JSON.parse(stored);
    } else {
        campaigns = getDefaultCampaigns();
        saveCampaigns();
    }
}

function saveCampaigns() {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
}

// ===== Navigation =====
function showHome() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('home-page').classList.add('active');
    displayCampaigns();
    updateGlobalStats();
    window.scrollTo(0, 0);
}

function showCreateCampaign() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('create-page').classList.add('active');
    document.getElementById('create-campaign-form').reset();
    window.scrollTo(0, 0);
}

function showCampaign(campaignId) {
    currentCampaign = campaigns.find(c => c.id === campaignId);
    if (!currentCampaign) return;

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('campaign-page').classList.add('active');

    // Populate campaign details
    document.getElementById('detail-category').textContent = currentCampaign.category;
    document.getElementById('detail-title').textContent = currentCampaign.title;
    document.getElementById('detail-date').textContent = new Date(currentCampaign.created).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    document.getElementById('detail-target').textContent = getTargetLabel(currentCampaign.target);
    document.getElementById('detail-description').textContent = currentCampaign.description;
    document.getElementById('detail-actions').textContent = currentCampaign.actions.toLocaleString();
    document.getElementById('detail-recent').textContent = (currentCampaign.recentActions || 0).toLocaleString();

    // Show hot badge if recent activity is high (more than 50 in last 24 hours)
    const isHot = (currentCampaign.recentActions || 0) >= 50;
    document.getElementById('detail-hot-container').style.display = isHot ? 'block' : 'none';

    // Reset action form
    document.getElementById('action-form').style.display = 'block';
    document.getElementById('success-message').style.display = 'none';
    document.getElementById('action-form').reset();
    document.getElementById('message-group').style.display = 'none';
    document.getElementById('reps-found').style.display = 'none';
    document.getElementById('action-btn').textContent = 'Find My Representatives';
    document.getElementById('user-message').value = currentCampaign.message;

    window.scrollTo(0, 0);
}

function scrollToCampaigns() {
    document.getElementById('campaigns-section').scrollIntoView({ behavior: 'smooth' });
}

// ===== Display Functions =====
let currentFilter = 'all';

function displayCampaigns() {
    const grid = document.getElementById('campaigns-grid');
    grid.innerHTML = '';

    // Sort by popularity (actions)
    const sorted = [...campaigns].sort((a, b) => b.actions - a.actions);

    sorted.forEach(campaign => {
        const card = createCampaignCard(campaign);
        grid.appendChild(card);
    });
}

function filterCampaigns(filter) {
    currentFilter = filter;

    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    const grid = document.getElementById('campaigns-grid');
    grid.innerHTML = '';

    let filtered = [...campaigns];

    // Apply filter
    switch(filter) {
        case 'hot':
            filtered = filtered.filter(c => (c.recentActions || 0) >= 50);
            filtered.sort((a, b) => b.recentActions - a.recentActions);
            break;
        case 'newest':
            filtered.sort((a, b) => new Date(b.created) - new Date(a.created));
            break;
        case 'most-active':
            filtered.sort((a, b) => b.actions - a.actions);
            break;
        default: // 'all'
            filtered.sort((a, b) => b.actions - a.actions);
    }

    filtered.forEach(campaign => {
        const card = createCampaignCard(campaign);
        grid.appendChild(card);
    });
}

function createCampaignCard(campaign) {
    const card = document.createElement('div');
    card.className = 'campaign-card';
    card.onclick = () => showCampaign(campaign.id);

    const isHot = (campaign.recentActions || 0) >= 50;
    const hotBadge = isHot ? '<div class="hot-badge"><span>🔥</span> HOT</div>' : '';

    card.innerHTML = `
        <div class="campaign-card-header">
            <div class="campaign-category-badge">${campaign.category}</div>
            ${hotBadge}
        </div>
        <h3 class="campaign-card-title">${campaign.title}</h3>
        <p class="campaign-card-description">${campaign.description}</p>
        <div class="campaign-card-stats">
            <div class="campaign-stat">
                <span class="campaign-stat-number">${campaign.actions.toLocaleString()}</span>
                <span>total</span>
            </div>
            <div class="campaign-stat">
                <span class="campaign-stat-number">${(campaign.recentActions || 0).toLocaleString()}</span>
                <span>last 24hrs</span>
            </div>
        </div>
    `;

    return card;
}

function updateGlobalStats() {
    const totalActions = campaigns.reduce((sum, c) => sum + c.actions, 0);
    const totalCampaigns = campaigns.length;
    const totalReps = Math.floor(totalActions * 2.3); // Simulate reps contacted

    document.getElementById('total-actions').textContent = totalActions.toLocaleString();
    document.getElementById('total-campaigns').textContent = totalCampaigns;
    document.getElementById('total-reps').textContent = totalReps.toLocaleString();
}

function getTargetLabel(target) {
    const labels = {
        'federal': 'Federal Representatives',
        'state': 'State Legislature',
        'local': 'Local Government',
        'all': 'All Levels'
    };
    return labels[target] || target;
}

// ===== Form Handling =====
function setupFormListeners() {
    // Character counter for description
    const descField = document.getElementById('campaign-description');
    const descCount = document.getElementById('desc-count');

    if (descField && descCount) {
        descField.addEventListener('input', () => {
            descCount.textContent = descField.value.length;
        });
    }
}

function createCampaign(event) {
    event.preventDefault();

    const newCampaign = {
        id: Date.now().toString(),
        title: document.getElementById('campaign-title').value,
        category: document.getElementById('campaign-category').value,
        description: document.getElementById('campaign-description').value,
        message: document.getElementById('campaign-message').value,
        target: document.getElementById('campaign-target').value,
        actions: 0,
        recentActions: 0,
        created: new Date().toISOString().split('T')[0]
    };

    campaigns.unshift(newCampaign);
    saveCampaigns();

    // Show success and redirect to campaign
    alert('Campaign created successfully! 🎉');
    showCampaign(newCampaign.id);
}

// ===== Representative Lookup =====
function takeAction(event) {
    event.preventDefault();

    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const zip = document.getElementById('user-zip').value;
    const actionBtn = document.getElementById('action-btn');

    // Check if we're in "find reps" mode or "send message" mode
    if (actionBtn.textContent === 'Find My Representatives') {
        // Find representatives
        const reps = findRepresentatives(zip, currentCampaign.target);
        displayRepresentatives(reps);

        // Show message field and update button
        document.getElementById('message-group').style.display = 'block';
        document.getElementById('reps-found').style.display = 'block';
        actionBtn.textContent = 'Send My Message';
    } else {
        // Send message (simulate)
        sendMessage(name, email, zip);
    }
}

function findRepresentatives(zip, targetLevel) {
    // Simulate representative lookup
    // In production, you'd use Google Civic Information API or similar
    const reps = [];

    if (targetLevel === 'federal' || targetLevel === 'all') {
        reps.push(
            { name: 'Senator Jane Smith', title: 'U.S. Senator', contact: 'senator.smith@senate.gov' },
            { name: 'Senator John Doe', title: 'U.S. Senator', contact: 'senator.doe@senate.gov' },
            { name: 'Rep. Maria Garcia', title: 'U.S. Representative, District ' + (zip.charAt(0)), contact: 'rep.garcia@house.gov' }
        );
    }

    if (targetLevel === 'state' || targetLevel === 'all') {
        reps.push(
            { name: 'State Sen. Robert Johnson', title: 'State Senator', contact: 'r.johnson@state.gov' },
            { name: 'State Rep. Emily Chen', title: 'State Representative', contact: 'e.chen@state.gov' }
        );
    }

    if (targetLevel === 'local' || targetLevel === 'all') {
        reps.push(
            { name: 'Mayor Sarah Williams', title: 'Mayor', contact: 'mayor@city.gov' },
            { name: 'Council Member David Brown', title: 'City Council', contact: 'd.brown@city.gov' }
        );
    }

    return reps;
}

function displayRepresentatives(reps) {
    const repsList = document.getElementById('reps-list');
    repsList.innerHTML = '<h4 style="margin-bottom: 12px; font-weight: 600;">Your Representatives:</h4>';

    reps.forEach(rep => {
        const repItem = document.createElement('div');
        repItem.className = 'rep-item';
        repItem.innerHTML = `
            <div class="rep-name">${rep.name}</div>
            <div class="rep-title">${rep.title}</div>
        `;
        repsList.appendChild(repItem);
    });
}

function sendMessage(name, email, zip) {
    // Simulate sending message
    // In production, this would integrate with official contact systems

    // Update campaign action counts
    currentCampaign.actions++;
    currentCampaign.recentActions = (currentCampaign.recentActions || 0) + 1;
    saveCampaigns();

    // Update display
    document.getElementById('detail-actions').textContent = currentCampaign.actions.toLocaleString();
    document.getElementById('detail-recent').textContent = currentCampaign.recentActions.toLocaleString();

    // Update hot badge
    const isHot = currentCampaign.recentActions >= 50;
    document.getElementById('detail-hot-container').style.display = isHot ? 'block' : 'none';

    // Show success message
    document.getElementById('action-form').style.display = 'none';
    document.getElementById('success-message').style.display = 'block';

    // Update global stats
    updateGlobalStats();

    // Store action in localStorage (for demo purposes)
    const actions = JSON.parse(localStorage.getItem('userActions') || '[]');
    actions.push({
        campaignId: currentCampaign.id,
        campaignTitle: currentCampaign.title,
        date: new Date().toISOString(),
        zip: zip
    });
    localStorage.setItem('userActions', JSON.stringify(actions));
}

// ===== Sharing Functions =====
function shareOnTwitter() {
    const text = encodeURIComponent(`Join me in taking action: ${currentCampaign.title} #Movement #CivicEngagement`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard! 📋');
    }).catch(err => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Link copied to clipboard! 📋');
    });
}

function shareAfterAction() {
    shareOnTwitter();
}

// ===== Utility Functions =====
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// ===== Demo Data Helper =====
// For demo purposes, add some randomness to action counts
function simulateActivity() {
    campaigns.forEach(campaign => {
        if (Math.random() > 0.7) {
            const newActions = Math.floor(Math.random() * 5) + 1;
            campaign.actions += newActions;
            campaign.recentActions = (campaign.recentActions || 0) + newActions;
        }
    });
    saveCampaigns();
    updateGlobalStats();
}

// Simulate activity every 30 seconds (for demo purposes)
setInterval(simulateActivity, 30000);
