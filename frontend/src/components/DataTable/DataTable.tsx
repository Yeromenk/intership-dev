import React, { useMemo, useState } from 'react';
import './DataTable.css';

// Dočasná rozhraní pro mockovaná data (později nahradíte reálným API z Pythonu)
export interface Trader {
    id: number;
    name: string;
    avatar: string;
    deals: number;
    value: number; // Hodnota v Kč
    trendPercent: number;
    sharePercent: number;
    region: string;
    team: string;
    month: string; // Formát musí být YYYY-MM kvůli <input type="month">
    badge?: string;
}

// Generování testovacích dat s upraveným formátem měsíce
const MOCK_DATA: Trader[] = [
    { id: 1, name: 'Petra Nováková', avatar: 'https://i.pravatar.cc/150?u=1', deals: 45, value: 2500000, trendPercent: 12, sharePercent: 45, region: 'Praha', team: 'Alpha', month: '2026-05', badge: 'Top Seller' },
    { id: 2, name: 'Martin Dvořák', avatar: 'https://i.pravatar.cc/150?u=2', deals: 38, value: 2100000, trendPercent: 8, sharePercent: 38, region: 'Brno', team: 'Beta', month: '2026-05' },
    { id: 3, name: 'Jana Horáková', avatar: 'https://i.pravatar.cc/150?u=3', deals: 31, value: 1850000, trendPercent: -5, sharePercent: 33, region: 'Ostrava', team: 'Gamma', month: '2026-05' },
    { id: 4, name: 'Tomáš Procházka', avatar: 'https://i.pravatar.cc/150?u=4', deals: 28, value: 1620000, trendPercent: 6, sharePercent: 29, region: 'Praha', team: 'Alpha', month: '2026-05', badge: 'Rising Star' },
    { id: 5, name: 'Eva Šimánková', avatar: 'https://i.pravatar.cc/150?u=5', deals: 24, value: 1340000, trendPercent: -3, sharePercent: 24, region: 'Brno', team: 'Beta', month: '2026-05' },
    { id: 6, name: 'Jakub Marek', avatar: 'https://i.pravatar.cc/150?u=6', deals: 21, value: 1150000, trendPercent: 4, sharePercent: 20, region: 'Ostrava', team: 'Gamma', month: '2026-05' },
    { id: 7, name: 'Lucie Veselá', avatar: 'https://i.pravatar.cc/150?u=7', deals: 19, value: 980000, trendPercent: -7, sharePercent: 18, region: 'Plzeň', team: 'Alpha', month: '2026-05' },
    { id: 8, name: 'Ondřej Blažek', avatar: 'https://i.pravatar.cc/150?u=8', deals: 17, value: 870000, trendPercent: 2, sharePercent: 15, region: 'Praha', team: 'Beta', month: '2026-05' },
    { id: 9, name: 'Markéta Čermáková', avatar: 'https://i.pravatar.cc/150?u=9', deals: 14, value: 720000, trendPercent: -9, sharePercent: 12, region: 'Brno', team: 'Beta', month: '2026-05' },
    { id: 10, name: 'Radek Novotný', avatar: 'https://i.pravatar.cc/150?u=10', deals: 12, value: 580000, trendPercent: 1, sharePercent: 10, region: 'Ostrava', team: 'Gamma', month: '2026-05' },
    // Přidal jsem jeden záznam z dubna pro ukázku fungování filtru:
    { id: 11, name: 'Ukázka Duben', avatar: 'https://i.pravatar.cc/150?u=11', deals: 5, value: 100000, trendPercent: 5, sharePercent: 2, region: 'Praha', team: 'Alpha', month: '2026-04' },
];

// Helper formátovací funkce
function formatCurrency(value: number) {
    return value.toLocaleString('cs-CZ') + ' Kč';
}

function formatPercent(n: number) {
    return (n > 0 ? '+' : '') + n + ' %';
}

// Funkce pro hezké zobrazení měsíce (převod z 2026-05 na "Květen 2026")
function formatMonthName(yyyyMM: string) {
    if (!yyyyMM) return '';
    const [year, monthNum] = yyyyMM.split('-');
    const date = new Date(parseInt(year), parseInt(monthNum) - 1);
    const str = date.toLocaleDateString('cs-CZ', { month: 'long', year: 'numeric' });
    // První písmeno velké (květen -> Květen)
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function DataTable() {
    const [data] = useState<Trader[]>(MOCK_DATA);

    // Stavy pro filtry
    const [month, setMonth] = useState<string>('2026-05'); // Výchozí měsíc v YYYY-MM
    const [nameFilter, setNameFilter] = useState<string>('');
    const [regionFilter, setRegionFilter] = useState<string>('Vše');
    const [teamFilter, setTeamFilter] = useState<string>('Vše');

    // Unikátní hodnoty pro select boxy (u regionu a týmu)
    const regions = Array.from(new Set(data.map((r) => r.region)));
    const teams = Array.from(new Set(data.map((r) => r.team)));

    // Aplikace filtrů a řazení dle úspěšnosti (hodnoty value)
    const filtered = useMemo(() => {
        return data
            .filter((r) => (month ? r.month === month : true))
            .filter((r) => (nameFilter ? r.name.toLowerCase().includes(nameFilter.toLowerCase()) : true))
            .filter((r) => (regionFilter === 'Vše' ? true : r.region === regionFilter))
            .filter((r) => (teamFilter === 'Vše' ? true : r.team === teamFilter))
            .sort((a, b) => b.value - a.value);
    }, [data, month, nameFilter, regionFilter, teamFilter]);

    // Rozdělení dat na pódium a zbytek
    const top3 = filtered.slice(0, 3);
    const places4to6 = filtered.slice(3, 6);
    const rest = filtered.slice(6);

    // Výpočet celkových metrik (KPI nahoře)
    const totalValue = filtered.reduce((acc, curr) => acc + curr.value, 0);
    const totalDeals = filtered.reduce((acc, curr) => acc + curr.deals, 0);

    // Reset filtrů
    const clearFilters = () => {
        setMonth('2026-05');
        setNameFilter('');
        setRegionFilter('Vše');
        setTeamFilter('Vše');
    };

    return (
        <div className="cr-dashboard fade-in">
            {/* Hlavička a globální KPI */}
            <div className="cr-header">
                <div className="cr-title-area">
                    <h1 className="cr-title">Žebříček obchodníků</h1>
                    <p className="cr-subtitle">Měsíční přehled a výkonnost týmu</p>
                </div>
                <div className="cr-kpi-cards">
                    <div className="kpi-card">
                        <span className="kpi-label">Celkový obrat</span>
                        <span className="kpi-value text-gradient">{formatCurrency(totalValue)}</span>
                    </div>
                    <div className="kpi-card">
                        <span className="kpi-label">Celkem dealů</span>
                        <span className="kpi-value">{totalDeals}</span>
                    </div>
                </div>
            </div>

            {/* Sekce s filtry */}
            <div className="cr-filters-section glass-panel">
                <div className="filters-grid">
                    <div className="filter-item">
                        <label>Měsíc (Kalendář)</label>
                        {/* Použití nativního kalendáře HTML5 pro přesný výběr roku a měsíce */}
                        <input
                            type="month"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        />
                    </div>
                    <div className="filter-item">
                        <label>Obchodník (Hledat)</label>
                        <input
                            type="text"
                            placeholder="Jméno..."
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                        />
                    </div>
                    <div className="filter-item">
                        <label>Region</label>
                        <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
                            <option>Vše</option>
                            {regions.map((r) => (<option key={r}>{r}</option>))}
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>Tým</label>
                        <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>
                            <option>Vše</option>
                            {teams.map((t) => (<option key={t}>{t}</option>))}
                        </select>
                    </div>
                </div>
                <div className="filters-actions">
                    <div className="active-filters">
                        {month ? formatMonthName(month) : 'Všechny měsíce'}
                        {regionFilter !== 'Vše' && ` | ${regionFilter}`}
                        {teamFilter !== 'Vše' && ` | ${teamFilter}`}
                    </div>
                    <button className="btn-clear" onClick={clearFilters}>× Vyčistit filtry</button>
                </div>
            </div>

            {/* Top 3 stupně vítězů (Pódium) */}
            {top3.length > 0 && (
                <div className="cr-podium-section">
                    <div className="podium-container">
                        {/* 2. místo */}
                        {top3[1] && (
                            <div className="podium-card silver-place slide-up" style={{ animationDelay: '0.1s' }}>
                                <div className="place-badge">🥈 2. MÍSTO</div>
                                <img src={top3[1].avatar} alt={top3[1].name} className="trader-avatar" />
                                <h3 className="trader-name">{top3[1].name}</h3>
                                <div className={`trader-trend ${top3[1].trendPercent > 0 ? 'up' : 'down'}`}>{formatPercent(top3[1].trendPercent)}</div>
                                <div className="trader-metrics">
                                    <div className="metric"><span>{top3[1].deals}</span> dealů</div>
                                    <div className="metric highlight">{formatCurrency(top3[1].value)}</div>
                                </div>
                            </div>
                        )}

                        {/* 1. místo */}
                        {top3[0] && (
                            <div className="podium-card gold-place slide-up">
                                {top3[0].badge && <span className="vip-badge">{top3[0].badge}</span>}
                                <div className="place-badge">🏆 1. MÍSTO</div>
                                <img src={top3[0].avatar} alt={top3[0].name} className="trader-avatar large" />
                                <h3 className="trader-name">{top3[0].name}</h3>
                                <div className={`trader-trend ${top3[0].trendPercent > 0 ? 'up' : 'down'}`}>{formatPercent(top3[0].trendPercent)}</div>
                                <div className="trader-metrics">
                                    <div className="metric"><span>{top3[0].deals}</span> dealů</div>
                                    <div className="metric highlight">{formatCurrency(top3[0].value)}</div>
                                </div>
                            </div>
                        )}

                        {/* 3. místo */}
                        {top3[2] && (
                            <div className="podium-card bronze-place slide-up" style={{ animationDelay: '0.2s' }}>
                                <div className="place-badge">🥉 3. MÍSTO</div>
                                <img src={top3[2].avatar} alt={top3[2].name} className="trader-avatar" />
                                <h3 className="trader-name">{top3[2].name}</h3>
                                <div className={`trader-trend ${top3[2].trendPercent > 0 ? 'up' : 'down'}`}>{formatPercent(top3[2].trendPercent)}</div>
                                <div className="trader-metrics">
                                    <div className="metric"><span>{top3[2].deals}</span> dealů</div>
                                    <div className="metric highlight">{formatCurrency(top3[2].value)}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Karty pro 4. - 6. místo */}
            {places4to6.length > 0 && (
                <div className="cr-runners-up fade-in" style={{ animationDelay: '0.3s' }}>
                    {places4to6.map((r, i) => (
                        <div key={r.id} className="runner-card glass-panel">
                            <div className="runner-rank">{i + 4}.</div>
                            <img src={r.avatar} alt={r.name} className="runner-avatar" />
                            <div className="runner-info">
                                <h4>{r.name} {r.badge && <span className="mini-badge">{r.badge}</span>}</h4>
                                <p>{r.deals} dealů • {formatCurrency(r.value)}</p>
                            </div>
                            <div className={`runner-trend ${r.trendPercent > 0 ? 'up' : 'down'}`}>
                                {formatPercent(r.trendPercent)}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tabulka pro zbylé obchodníky (7. a další) */}
            <div className="cr-table-container glass-panel fade-in" style={{ animationDelay: '0.4s' }}>
                <table className="cr-table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Obchodník</th>
                        <th>Dealy</th>
                        <th>Hodnota</th>
                        <th>Trend</th>
                        <th>Podíl</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rest.map((r, idx) => (
                        <tr key={r.id}>
                            <td className="rank-cell"><span>{idx + 7}</span></td>
                            <td>
                                <div className="td-trader">
                                    <img src={r.avatar} alt={r.name} className="td-avatar" />
                                    <span className="td-name">{r.name}</span>
                                </div>
                            </td>
                            <td className="deals-cell">{r.deals}</td>
                            <td className="value-cell">{formatCurrency(r.value)}</td>
                            <td>
                  <span className={`trend-badge ${r.trendPercent > 0 ? 'up' : 'down'}`}>
                    {r.trendPercent > 0 ? '↑' : '↓'} {Math.abs(r.trendPercent)}%
                  </span>
                            </td>
                            <td>
                                <div className="share-bar-container">
                                    <span className="share-value">{r.sharePercent}%</span>
                                    <div className="share-track">
                                        <div className="share-fill" style={{ width: `${r.sharePercent}%` }}></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {/* Stav pokud se nic nenajde */}
                    {filtered.length === 0 && (
                        <tr><td colSpan={6} className="empty-state">Pro vybrané filtry nebyla nalezena žádná data...</td></tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}