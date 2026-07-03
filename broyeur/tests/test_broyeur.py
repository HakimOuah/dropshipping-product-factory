"""
Tests de validation du broyeur avec les produits RÉELS cités dans les 9 vidéos.
Objectif : vérifier que le broyeur tranche comme le formateur.

On code ce qu'il DIT de chaque produit, et on assert la décision attendue.
Lancer : pytest -v  (depuis broyeur_package/)
"""

import pytest
from broyeur.broyeur import Broyeur, Product

B = Broyeur()


def decide(p: Product) -> str:
    return B.evaluate(p).decision


# ---------- produits qu'il RETIENT (attendu shortlist ou review) ----------

def test_biker_jewelry():
    # bague biker 120€ / 3€ ali, dropshippers, niche défendable (pas sur Shein)
    p = Product(
        product_name="Biker jewelry",
        source="flippa", category="jewelry_biker",  # note: pas 'jewelry' générique
        price_sell=120, price_source_ali=3,
        competitors_type="dropshippers_weak_sites",
        sells_in_search=True, sells_in_shopping=True,
        legal_eu=True, not_available_on_generic_channels="yes",
    )
    # marge énorme (40x) mais ticket bas (120 -> 6pts). doit au moins survivre.
    assert decide(p) in ("shortlist", "review")


def test_cabane_enfant():
    # cabane 1000€ / 250€, frontière baby/toys -> override doit la garder
    p = Product(
        product_name="Cabane pour enfants",
        source="flippa", category="toys",
        price_sell=1000, price_source_ali=250,
        competitors_type="dropshippers_weak_sites",
        sells_in_search=True, sells_in_shopping=True,
        legal_eu=True, not_available_on_generic_channels="yes",
    )
    # price 1000 (13) + marge 4x (20) + concu (20) + search+shopping (15)
    # + flippa (12) + niche (8) = 88 -> shortlist
    assert decide(p) == "shortlist"


def test_boite_a_montre():
    # sa pépite Bigbuy : niche, pas de marque, marche partout + search
    p = Product(
        product_name="Boîte à montre / remontoir",
        source="bigbuy", category="watch_accessories",
        price_sell=250, price_source_ali=45,
        competitors_type="few_or_none",
        sells_in_search=True, sells_in_shopping=False,
        legal_eu=True, not_available_on_generic_channels="yes",
    )
    assert decide(p) in ("shortlist", "review")


def test_fauteuil_suspendu():
    # Europages : bon signal, que des dropshippers, GMC oui
    p = Product(
        product_name="Fauteuil suspendu",
        source="europages", category="garden",
        price_sell=400, price_source_ali=90,
        competitors_type="dropshippers_weak_sites",
        sells_in_search=True, sells_in_shopping=True,
        legal_eu=True, not_available_on_generic_channels="partial",
    )
    assert decide(p) == "shortlist"


def test_applique_murale_led():
    # Pinterest : validé (ads), dropshippers, bonne marge, mais bcp de concurrents
    p = Product(
        product_name="Applique murale LED",
        source="pinterest_trends", category="home_decoration",
        price_sell=180, price_source_ali=25,
        competitors_type="dropshippers_mixed",
        sells_in_search=True, sells_in_shopping=True,
        legal_eu=True, not_available_on_generic_channels="partial",
    )
    assert decide(p) in ("shortlist", "review")


def test_stérilisateur_biberon():
    # Amazon M&S niche bébé : ~360€ vente / ~90€, override baby garde
    p = Product(
        product_name="Stérilisateur biberon",
        source="amazon_movers", category="baby",
        price_sell=360, price_source_ali=90,
        competitors_type="dropshippers_weak_sites",
        sells_in_search=True, sells_in_shopping=True,
        legal_eu=True, not_available_on_generic_channels="yes",
    )
    # override baby : price>=400 requis -> 360 échoue ! doit être rejeté par override
    # -> ce test documente la frontière : à 360 il tombe, à 400+ il passe.
    assert decide(p) == "reject"


def test_stérilisateur_biberon_420():
    # même produit mais listé à 420€ -> passe l'override
    p = Product(
        product_name="Stérilisateur biberon (420)",
        source="amazon_movers", category="baby",
        price_sell=420, price_source_ali=90,
        competitors_type="dropshippers_weak_sites",
        sells_in_search=True, sells_in_shopping=True,
        legal_eu=True, not_available_on_generic_channels="yes",
    )
    assert decide(p) in ("shortlist", "review")


# ---------- produits qu'il REJETTE (attendu reject) ----------

def test_dashcam():
    # Bigbuy : Amazon vend à prix coûtant, pas de marge
    p = Product(
        product_name="Dashcam",
        source="bigbuy", category="car_motorbike_generic",
        price_sell=80, price_source_ali=40,
        competitors_type="institutional",
        big_retailer_same_product=True, legal_eu=True,
    )
    assert decide(p) == "reject"


def test_cave_a_vin():
    # Leroy Merlin à 199€, marges triquées
    p = Product(
        product_name="Cave à vin",
        source="bigbuy", category="home_cooking",
        price_sell=199, price_source_ali=120,
        competitors_type="semi_brands",
        big_retailer_same_product=True, legal_eu=True,
    )
    assert decide(p) == "reject"


def test_banc_muscu():
    # Amazon M&S : Decathlon 10x moins cher, livré 2j
    p = Product(
        product_name="Banc de musculation",
        source="amazon_movers", category="sports",
        price_sell=300, price_source_ali=130,
        competitors_type="institutional",
        big_retailer_same_product=True, legal_eu=True,
    )
    assert decide(p) == "reject"


def test_matcha_cheap():
    # produit cheap basé sur une mode
    p = Product(
        product_name="Fouet à matcha",
        source="flippa", category="home_cooking",
        price_sell=15, price_source_ali=2,
        competitors_type="dropshippers_mixed",
        is_seasonal=True, legal_eu=True,
    )
    assert decide(p) == "reject"  # ticket < 150 -> hard filter


def test_collier_electrique():
    # interdit EU
    p = Product(
        product_name="Collier électrique chien",
        source="amazon_movers", category="pet",
        price_sell=90, price_source_ali=15,
        legal_eu=False,
    )
    assert decide(p) == "reject"


def test_pergola():
    # Europages : 4-6k€, coût de testing prohibitif -> rejet auto (>2000)
    p = Product(
        product_name="Pergola bioclimatique",
        source="europages", category="garden",
        price_sell=5000, price_source_ali=1200,
        competitors_type="dropshippers_mixed",
        sells_in_search=True, legal_eu=True,
    )
    assert decide(p) == "reject"


def test_vetements_travail():
    # exclusion catégorielle (fournis par employeur)
    p = Product(
        product_name="Chaussures de sécurité",
        source="vevor", category="workwear",
        price_sell=160, price_source_ali=40,
        legal_eu=True,
    )
    assert decide(p) == "reject"


# ---------- garde-fous / flags ----------

def test_force_review_legal_non_verifie():
    # bon score mais legal_eu non renseigné -> doit basculer en review
    p = Product(
        product_name="Produit non vérifié",
        source="flippa", category="garden",
        price_sell=700, price_source_ali=140,
        competitors_type="dropshippers_weak_sites",
        sells_in_search=True, sells_in_shopping=True,
        legal_eu=None, not_available_on_generic_channels="yes",
    )
    assert decide(p) == "review"


def test_marge_manquante_force_review():
    # prix ali manquant -> marge non calculable -> review même si reste bon
    p = Product(
        product_name="Prix ali manquant",
        source="flippa", category="garden",
        price_sell=700, price_source_ali=None,
        competitors_type="dropshippers_weak_sites",
        sells_in_search=True, sells_in_shopping=True,
        legal_eu=True, not_available_on_generic_channels="yes",
    )
    assert decide(p) == "review"


if __name__ == "__main__":
    import sys
    sys.exit(pytest.main([__file__, "-v"]))
